import querystring from "node:querystring";
import { CounterMapper, CounterVisitor, MessageMapper } from "../../models/index.mapper.js";
//==================================================================//
// GET DATA FOR TIME CAPSULE MESSAGE PAGE
//==================================================================//
export async function timeCapsuleMessagePageData() {
  const messagePending = await MessageMapper.countPendingMessages();

  const numberMessageSent = await CounterMapper.getCounterMessageSent();
  const { sentMessageCount } = numberMessageSent;

  await CounterVisitor.incrementCounter();

  const visitor = await CounterVisitor.getVisitorCounter();
  const { landingVisitCount } = visitor;

  return {
    messagePending,
    sentMessageCount,
    landingVisitCount,
  };
}

//==================================================================//
// CREATING NEW TIME CAPSULE MESSAGE
//==================================================================//
export async function postNewCapsuleMessage({ email, name, message, delay, token, ip, recaptchaSecretKey }) {
  if (!token) {
    return {
      error: {
        type: "missing_captcha",
        text: "Captcha manquant.",
      },
    };
  }

  const verifyRes = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: querystring.stringify({
      secret: recaptchaSecretKey,
      response: token,
      remoteip: ip,
    }),
  });

  const verifyData = await verifyRes.json();

  if (!verifyData.success) {
    return {
      error: {
        type: "invalid_captcha",
        text: "Vérification reCAPTCHA échouée. Réessaie.",
      },
    };
  }

  const dateToSend = new Date();
  let customDateMessage;

  switch (delay) {
    case "3d":
      dateToSend.setDate(dateToSend.getDate() + 3);
      customDateMessage = "3 jours";
      break;
    case "1w":
      dateToSend.setDate(dateToSend.getDate() + 7);
      customDateMessage = "1 semaine";
      break;
    case "1m":
      dateToSend.setMonth(dateToSend.getMonth() + 1);
      customDateMessage = "1 mois";
      break;
    case "3m":
      dateToSend.setMonth(dateToSend.getMonth() + 3);
      customDateMessage = "3 mois";
      break;
    case "6m":
      dateToSend.setMonth(dateToSend.getMonth() + 6);
      customDateMessage = "6 mois";
      break;
    default:
      return {
        error: {
          type: "invalid_delay",
          text: "Délai invalide.",
        },
      };
  }

  try {
    const messageData = {
      email,
      first_name: name,
      message,
      date_to_send: dateToSend,
    };

    await MessageMapper.newMessage(messageData);

    return {
      success: {
        text: `Message ajouté. À dans ${customDateMessage} !`,
      },
    };
  } catch (err) {
    if (err.code === 11000 && err.keyPattern?.email) {
      return {
        error: {
          type: "duplicate_email",
          text: "Cet email est déjà utilisé.",
        },
      };
    }

    throw err;
  }
}
