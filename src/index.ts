import './assets/style/style.scss';
import Controller from './Controller/slider.controller';

new Controller('.slider', {
    tooltip: {
        display: true,
        percent: true
    },
    range: true,
    configPanel: true
});

new Controller('.second', {
    min: -10000,
    max: 500,
});

// $('body').append($(`
//     <textarea class="textField"></textarea>
//     <div>Words Count:
//         <p class="countField"></p>
//     </div>
// `));

// const blogObserver = new Observer();
//
//
// const textField = $('.textField');
// const countField = $('.countField');
//
// blogObserver.subscribe((data: any)=> {
//     console.log(data);
//     countField.text(getWordsCount(data));
// });
//
// textField.on('keyup', () => {
//     blogObserver.broadcast(textField.val());
// });
//
// const getWordsCount = (text: any) => text.length;
