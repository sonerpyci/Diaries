module.exports = {
    helloWorld: (req, res, next) => {
        res.send({success:true, message:"Hello World!"});
    }
};