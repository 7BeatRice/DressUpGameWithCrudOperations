const calcPrice = (selections) => {
    let total = 0

    Object.values(selections).forEach((item) => {
        if (item && item.price) {
            const value = parseFloat(item.price.replace('$', ''))
            if (!isNaN(value)) {
                total += value
            }
        }
    })

    return total
}

export default calcPrice