function buildProgrammedMessageEmail({ firstName, delayLabel, userMessage }) {
  const subject = "Ton message programmé est arrivé 🎉";

  const text = `
    Salut ${firstName} 👋 !

    Il y a très exactement ${delayLabel}, tu avais pris un instant pour
    écrire quelques lignes que tu voulais garder pour plus tard ⏱️. 
    Comme une petite note glissée dans une enveloppe, en attendant le bon moment pour l’ouvrir.

    Et ce moment est arrivé aujourd’hui ☀️ ! 
    Voici ce que ton ancien toi voulait te partager:

    ${userMessage}

    — Florian, de All Will Be Well`;

  const html = `
    <article style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,'Helvetica Neue',Arial,sans-serif;line-height:1.6;color:#0f172a;padding:16px;">
        <p>Salut <strong>${firstName}</strong> 👋 !</p>
        </br>
        <p>Il y a très exactement <strong>${delayLabel}</strong>, tu avais pris un instant pour
        écrire quelques lignes que tu voulais garder pour plus tard ⏱️.</p>
        </br>
        <p>Comme une petite note glissée dans une enveloppe, en attendant le bon moment pour l’ouvrir.</p>
        </br>
        <p>Et ce moment est arrivé aujourd’hui ☀️ !</p>
        <p>Voici ce que ton ancien toi voulait te partager:</p>
        </br>
        <blockquote style="margin:16px 0;padding:12px 16px;border-left:4px solid #046a6a;background:#f8fafc;white-space:pre-wrap;">
        ${userMessage}
        </blockquote>

        <p style="font-size:12px;">— Florian, de All Will Be Well</p>
    </article>`;

  return { subject, text, html };
}

module.exports = { buildProgrammedMessageEmail };
