const validateInput = (category, selections) => {
    console.log("enterered validate")
    if (category === 'dress' && (selections.top || selections.bottom)) {
        console.log("invalid dress")
        return "can't select a dress while a top or bottom is selected"
    }

    if ((category === 'top' || category === 'bottom') && selections.dress) {
        console.log("invalid top")
        return "can't select a top or bottom while a dress is selected"
    }

    return ''
}

export default validateInput