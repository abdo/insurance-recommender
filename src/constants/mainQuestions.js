import occupationStates from './occupationStates';

const mainQuestions = [
  {
    key: 'firstName',
    text: "What's your first name?",
    type: 'text',
  },
  {
    key: 'address',
    text: "What's your address?",
    type: 'text',
  },
  {
    key: 'occupation',
    text: "What's your occupation?",
    type: 'radio',
    options: occupationStates,
    required: true,
  },
  {
    key: 'childrenPossession',
    text: 'Do you have any children?',
    type: 'radio',
    options: [
      { label: 'Yes', value: true },
      { label: 'No', value: false },
    ],
  },
  {
    key: 'childrenNumber',
    text: 'How many children do you have?',
    type: 'number',
    dependencies: ['childrenPossession'],
  },
  {
    key: 'email',
    text: "What's your email?",
    type: 'number',
    validation: 'email',
    required: true,
  },
];

export default mainQuestions;
