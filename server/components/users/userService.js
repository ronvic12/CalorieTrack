// for now use Static Classes (Object Literals) for simplicity of the function.
// but if there is encapsulation, use Dynamic Classes (Constructor Functions/Class Syntax):


module.exports = class userService{
    static async myFunc(data) {
        return new Promise( async(resolve, reject) => {
            try {
              console.log("Weight",data.weight);
            } catch(err) {
              console.log(err);
              return reject(err)
            }
          })
    }
}
