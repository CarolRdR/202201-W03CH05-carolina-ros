import { App } from './services/apicall';

class nextButton extends App {
    constructor(name) {
       super()

    }

document.querySelectorAll('#next-page').addEventListener('click', nextButton());

}
