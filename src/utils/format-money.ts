export function formatMoney(value: string | number): string {
  let money: string | number = value

  if (typeof money === 'number') {
    money = money.toFixed(2)
  }

  if (String(money).replace(/\D/g, '').length >= 16) {
    money = String(money).slice(0, -1)
  }

  if (typeof money === 'string') {
    money = Number(money.replace(/\D/g, '') || '0') / 100
  }

  money = Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(money)

  return money
}
