

export const uploadFile = async (req, res) => {
    try {
        const file = req.files[0];

        console.log(file)
    } catch (err) {
        console.log(err)
    }
};
