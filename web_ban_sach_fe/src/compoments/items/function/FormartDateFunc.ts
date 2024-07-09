export const formartDateFunc = (value?: string): string => {
    if (!value) return 'null'
    const date = new Date(value)
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
}