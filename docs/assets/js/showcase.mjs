import {scorePractice} from './practice-score.mjs';
for(const i of document.querySelectorAll('[data-practice] input'))i.disabled=false;
for(const exhibit of document.querySelectorAll('[data-practice]')){
 const fields=['misses','streak','hours'];function update(){let data=Object.fromEntries(fields.map(k=>[k,Number(exhibit.querySelector(`[data-${k}]`).value)]));data.recent=exhibit.querySelector('[data-recent]').checked;const result=scorePractice(data);for(const k of fields)exhibit.querySelector(`[data-${k}-label]`).textContent=data[k];exhibit.querySelector('[data-priority]').textContent=result.priority;exhibit.querySelector('[data-priority-bar]').style.width=`${result.priority}%`;const list=exhibit.querySelector('[data-reasons]');list.replaceChildren();for(const reason of result.reasons.length?result.reasons:['No additional reason flags']){let li=document.createElement('li');li.textContent=reason;list.append(li);}}
 for(const input of exhibit.querySelectorAll('input'))input.addEventListener('input',update);update();
}
