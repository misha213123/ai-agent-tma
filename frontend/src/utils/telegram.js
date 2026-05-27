function getGuestId() {
  let guestId = localStorage.getItem("guest_id");

  if (!guestId) {
    guestId = `guest-${crypto.randomUUID()}`;
    localStorage.setItem("guest_id", guestId);
  }

  return guestId;
}

export function getTelegramUser() {
  const tg = window.Telegram?.WebApp;

  if (!tg) {
    const guestId = getGuestId();

    return {
      telegram_id: guestId,
      first_name: "Гость",
      username: "web_user",
    };
  }

  tg.ready();
  tg.expand();

  const user = tg.initDataUnsafe?.user;

  if (!user?.id) {
    const guestId = getGuestId();

    return {
      telegram_id: guestId,
      first_name: "Гость",
      username: "web_user",
    };
  }

  return {
    telegram_id: String(user.id),
    first_name: user.first_name || "Пользователь",
    username: user.username || "",
  };
}