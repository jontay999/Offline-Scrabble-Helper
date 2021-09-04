const checkInput = (input, checking) => {
    let good_input;
    checking ?  good_input = /^(?:[A-Za-z]+)$/.test(input) : good_input = /^(?:[A-Za-z\?]+)$/.test(input)
    return good_input
}

export default checkInput