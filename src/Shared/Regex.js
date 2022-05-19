export const emailValidator=(username)=>{
    const reGex=/^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;
    return reGex.test(username);
}
export const passwordValidator=(password)=>{
    const reGex=/^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$/;
    return reGex.test(password);
}