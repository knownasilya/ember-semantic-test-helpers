import { buttonQuery, formControlQuery } from './dom/selectors';
import { stratergies } from './config';
import notify from './notify';

export function findButton(labelText){
  return findObject(buttonQuery, labelText, 'button');
}

export function findButtons(labelText){
  return findObjects(buttonQuery, labelText, 'button');
}

export function findControl(labelText) {
  return findObject(formControlQuery, labelText, 'control');
}

export default function findControls(labelText) {
  return findObjects(formControlQuery, labelText, 'control');
}

export function findObject(selector, labelText, type) {
  let objects = findObjects(selector, labelText, type)
  if(objects.length > 1){
    notify('ambiguousLabel', type, labelText);
  }
  return objects[0];
}

export function findObjects(selector, labelText, type='object', index=0) {
  let key, strategy;
  if(!key){
    if(stratergies.length === (index + 1)) {
      return
    }
    key = stratergies[index][0]
    strategy = stratergies[index][1]
  }

  let objects = strategy(selector, labelText)
  if(objects.length == 0){
    notify(key, type, labelText);
    objects = findObjects(selector, labelText, type, index + 1)
    if(index == stratergies.length-1){
      throw new Error('reached the end')
      //notify('missingObject', type, labelText);
    }
  }
  return objects;
}
