export function getTelegramUser() {
  const tg = window.Telegram?.WebApp;

  if (!tg) {
    return {
      telegram_id: "demo-user",
      first_name: "Demo",
      username: "demo",
    };
  }

  tg.ready();
  tg.expand();

  const user = tg.initDataUnsafe?.user;

  return {
    telegram_id: user?.id ? String(user.id) : "demo-user",
    first_name: user?.first_name || "Пользователь",
    username: user?.username || "",
  };
}