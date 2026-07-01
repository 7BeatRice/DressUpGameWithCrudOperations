const validateInput = (category, selections) => {
    if (category === 'dress' && (selections.top || selections.bottom)) {
        return "can't select a dress while a top or bottom is selected"
    }

    if ((category === 'top' || category === 'bottom') && selections.dress) {
        return "can't select a top or bottom while a dress is selected"
    }

    return ''
}

export default validateInput