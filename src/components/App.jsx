import { useState } from 'react';
import Feedbacks from './Feedbacks/Feedbacks';
import Statistics from './Statistics/Statistics';
import Section from './Section/Section';
import Notification from './Notification/Notification';


//Переробляємо на хуки

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);


  const protectTotalFeedback = () => {
    return good + neutral + bad;
  };


  const protectPositiveFeedbackPercentage = () => {
    return Math.round((good * 100) / protectTotalFeedback());
  };


  const handlerButton = elem => {
    const { name } = elem.target;
    switch (name) {
      case 'good':
        setGood(state => state + 1);
        break;
      case 'neutral':
        setNeutral(state => state + 1);
        break;
      case 'bad':
        setBad(state => state + 1);
        break;
      default:
        return;
    }
  };


  return (
    <>
      <Section title="Please leave feedback">
        <Feedbacks
          options={['good', 'neutral', 'bad']}
          onLeaveFeedback={handlerButton}
        ></Feedbacks>
      </Section>
      <Section title="Statistics">
        {!protectTotalFeedback() ? (
          <Notification message="There is no feedback"></Notification>
        ) : (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={protectTotalFeedback()}
            positivePercentage={protectPositiveFeedbackPercentage()}
          />
        )}
      </Section>
    </>
  );
};


export { App };


  
  
//Старий код через компоненти

// import { Component } from 'react';
// import Feedbacks from './Feedbacks/Feedbacks';
// import Statistics from './Statistics/Statistics';
// import Section from './Section/Section';
// import Notification from './Notification/Notification';

// class App extends Component {
//   state = {
//     good: 0,
//     neutral: 0,
//     bad: 0,
//   };
//   protectTotalFeedback = () => {
//     const { good, neutral, bad } = this.state;
//     const total = good + neutral + bad;
//     return total;
//   };

//   protectPositiveFeedbackPercentage = () => {
//     return Math.round((this.state.good * 100) / this.protectTotalFeedback());
//   };

//   handlerButton = elem => {
//     const { name } = elem.target;
//     this.setState(ps => {
//       return { [name]: ps[name] + 1 };
//     });
//   };

//   render() {
//     const { good, neutral, bad } = this.state;
//     return (
//       <>
//         <Section title="Please leave feedback">
//           <Feedbacks
//             options={Object.keys(this.state)}
//             onLeaveFeedback={this.handlerButton}
//           ></Feedbacks>
//         </Section>
//         <Section title="Statistics">
//           {!this.protectTotalFeedback() ? (
//             <Notification message="There is no feedback"></Notification>
//           ) : (
//             <Statistics
//               good={good}
//               neutral={neutral}
//               bad={bad}
//               total={this.protectTotalFeedback()}
//               positivePercentage={this.protectPositiveFeedbackPercentage()}
//             />
//           )}
//         </Section>
//       </>
//     );
//   }
// }

// export { App };