import Toast from "./toast";

function error(text: Error) {
    console.error(text);
    Toast.showError(Error.toString());
}

function info(text: string) {
    console.info(text);
    Toast.showInfo(text);
}

const Message = {
    info,
    error
};

export default Message; 
