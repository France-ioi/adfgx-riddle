import React from "react";
import {connect} from "react-redux";
import update from "immutability-helper";

class AnswerDialog extends React.PureComponent {
  _refCity = el => {
    this._city = el;
  };

  componentDidMount () {
    // When the component mounts, select the first input box.
    this._city && this._city.focus();
  }

  onAnswerChanged = event => {
    const key = event.currentTarget.name;
    const value = event.currentTarget.value;
    this.props.dispatch({type: this.props.answerChanged, key, value});
  };

  render () {
    const {answer} = this.props;
    return (
      <div className='adfgx-answer-dialog'>
        <div className='section'>
          <p>
            Entrez ci-dessous les quatre parties de votre réponse, puis
            cliquez sur le bouton Soumettre pour connaître le score obtenu.
               </p>
          <p>
            Vous pouvez soumettre plusieurs réponses. La seule limite est
            que vous ne pouvez pas soumettre plus de deux fois en moins
            d'une minute.
               </p>
          <p className="input">
            <label htmlFor="answer-c">{'Lieu (ville ou pays) : '}</label>
            <input type="text" id="answer-c" value={answer.c}
              name="c"
              onChange={this.onAnswerChanged}
              ref={this._refCity} />
          </p>
          <p className="input">
            <label htmlFor="answer-m1">{'Métal 1 : '}</label>
            <input type="text" id="answer-m1" value={answer.m1}
              name="m1"
              onChange={this.onAnswerChanged} />
          </p>
          <p className="input">
            <label htmlFor="answer-m2">{'Métal 2 : '}</label>
            <input type="text" id="answer-m2" value={answer.m2}
              name="m2"
              onChange={this.onAnswerChanged} />
          </p>
          <p className="input">
            <label htmlFor="answer-m3">{'Métal 3 : '}</label>
            <input type="text" id="answer-m3" value={answer.m3}
              name="m3"
              onChange={this.onAnswerChanged} />
          </p>
        </div>
        <div className='section'>
          <p>
            Remarque : les différences d'espaces, d'accents, de
            minuscules/majuscules, de W à la place de V ou vice-versa sont ignorées lors de la
            comparaison entre les réponses fournies et celles attendues.
            L'ordre des trois métaux n'a pas d'importance.
               </p>
          <p>Le score est calculé comme suit :</p>
          <ul>
            <li>vous partez d'un capital de 1000 points ;</li>
            <li>35, 50 ou 200 points sont retirés de ce capital pour chaque indice
                      demandé avant votre réponse, suivant le type d'indice ;</li>
            <li>si vous avez à la fois le bon lieu et les trois métaux,
                     votre score est égal au capital restant ;</li>
            <li>si vous n'avez que le lieu, ou bien que les trois métaux,
                      votre score est égal à la moitié du capital restant.</li>
          </ul>
          <p>Autres remarques sur les scores :</p>
          <ul>
            <li>le score de l'équipe pour un sujet est le meilleur score
                      parmi toutes les soumissions ;</li>
            <li>le score du tour est le meilleur score obtenu parmi les
                      sujets en temps limité</li>
          </ul>
        </div>
      </div>
    );
  }
}

function answerChangedReducer (state, action) {
  const {key, value} = action;
  return update(state, {answer: {[key]: {$set: value}}});
}

function AnswerSelector (state) {
  const {
    answer,
    actions: {answerChanged}
  } = state;

  return {
    answer,
    answerChanged
  };
}


function taskInitReducer (state) {
  return update(state, {
    answer: {$set: {c: '', m1: '', m2:'', m3: ''}}
  });
}


export default {
  actions: {
    answerChanged: "Answer.Changed"
  },
  actionReducers: {
    taskInit: taskInitReducer,
    answerChanged: answerChangedReducer
  },
  views: {
    AnswerDialog: connect(AnswerSelector)(AnswerDialog)
  }
};
