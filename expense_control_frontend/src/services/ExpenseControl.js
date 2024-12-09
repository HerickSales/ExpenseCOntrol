export default class ExpenseControl {
    API_URL = 'http://localhost:5186/';



    async #Request(endpoint, method, data=''){
        let response = await fetch(this.API_URL + endpoint, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: data?JSON.stringify(data): null
        })
        return response;

    
    }
//User
 

    
    async Login(user){

        let response= await this.#Request('User/Login', 'POST', user);
        return response
    }
    async CreateUser(user){
        let response= await this.#Request('User/Register', 'POST', user);
        let t= await response.json();
        console.log(t)
        return response
    }
    async GetUserPeople(userId){
        let response= await this.#Request(`User/${userId}/People`, 'GET');
        return await response.json();
    }   

//Person
    async CreatePerson(person){
        let response= await this.#Request('Person', 'POST', person);
        return response;

    }

    async UpdatePerson(person){
        let response= await this.#Request(`Person/${person.id}`, 'PUT', person);
        return response;

    }
    async DeletePerson(personId){
        let response= await this.#Request(`Person/${personId}`, 'DELETE');
        return response;
    }



    async GetPersonById(personId){
        
        let response= await this.#Request(`Person/${personId}`, 'GET');
        return  response;
    }


//Expense
    async CreateTransaction(transaction){
        let response= await this.#Request('Transaction', 'POST', transaction);
        return response;
    }
    async UpdateTransaction(transaction){
        let response= await this.#Request(`Transaction/${transaction.id}`, 'PUT', transaction);
        return response;

    }

    async DeleteTransaction(transaction){
        console.log(transaction)
        let response= await this.#Request(`Transaction/${transaction.id}`, 'DELETE');
        let respJson= await response.json();
        console.log(respJson)
        return response;

    }






}