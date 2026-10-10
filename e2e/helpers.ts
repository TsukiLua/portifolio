import type { Page } from "@playwright/test";

/**
 * Seleciona o primeiro dia que tenha ao menos um horário livre e marca esse horário.
 * Independe da hora em que o teste roda (ex.: fim do expediente de hoje).
 */
export async function pickFirstFreeSlot(page: Page, { keyboard = false } = {}) {
  const dates = page.locator("input[name='data']:not([disabled])");
  const free = page.locator("input[name='horario']:not([disabled])");
  const total = await dates.count();
  for (let i = 0; i < total; i++) {
    if (keyboard) {
      await dates.nth(i).focus();
      await page.keyboard.press("Space");
    } else {
      await dates.nth(i).locator("xpath=..").click();
    }
    if ((await free.count()) > 0) {
      if (keyboard) {
        await free.first().focus();
        await page.keyboard.press("Space");
      } else {
        await free.first().locator("xpath=..").click();
      }
      return;
    }
  }
  throw new Error("Nenhum horário livre na janela de agendamento");
}
