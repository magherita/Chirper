const logger = (store) => (next) => (action) => {
    console.group(action.type);
    console.log("The action: ", action);
    const nxt = next(action);
    console.log("The new state: ", store.getState());
    console.groupEnd();
    return nxt;
};

export default logger;