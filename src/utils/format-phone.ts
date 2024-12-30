export function formatPhone(value: string) {
  return value
    .replace(/\D/g, '') // Remove tudo que não é número
    .replace(/(\d{2})(\d)/, '($1) $2') // Adiciona parênteses ao DDD
    .replace(/(\d{5})(\d)/, '$1-$2') // Adiciona o hífen ao número
    .slice(0, 15) // Limita ao formato (99) 99999-9999
}
