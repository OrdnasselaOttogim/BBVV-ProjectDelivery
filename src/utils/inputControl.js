export const addressControl = publicAddress => {
    if (publicAddress.slice(0, 2) == "0x" && publicAddress.length == 42)
        return true
    else
        return false
};