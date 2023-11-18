const mysql = require('mysql2');

class Database {
    #conexao

    constructor(){
        this.#conexao = mysql.createPool({
            host: '132.226.245.178', 
            database: 'PFS1_10442221876',
            user: '10442221876',
            password: '10442221876',
        });
    }

    executaltarComandoLista(sql){
        return new Promise( (res, rej) => {
            this.#conexao.query(sql, (error, result) => {
                if(error){
                    rej(error);
                }
                else{
                    res(result);
                }
            })
        });
    }

    executaltarComandoCUD(sql, valores){
        return new Promise((res, rej) => {
            this.#conexao.query(sql, valores, (error, result) => {
                if(error){
                    res(false);
                    console.log(error)
                }
                else{
;                   res(result.affectedRows > 0);
                }
            })
        })
    }

    executaltarComandoR(sql, valor){
        return new Promise((res, rej) => {
            this.#conexao.query(sql, valor, (error, result) => {
                if(error){
                    res(error);
                }
                else{
                    res(result);
                }
            })
        })
    }
}

module.exports = Database;