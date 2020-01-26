import occupationStates from './occupationStates';

const mainQuestions = [
  {
    key: 'firstName',
    label: 'First Name',
    text: "What's your first name?",
    type: 'text',
    required: true,
  },
  {
    key: 'address',
    label: 'Address',
    text: "What's your address?",
    type: 'text',
    required: true,
  },
  {
    key: 'occupation',
    label: 'Occupation',
    text: "What's your occupation?",
    type: 'radio',
    options: occupationStates,
    required: true,
  },
  {
    key: 'childrenPossession',
    label: 'Children',
    text: 'Do you have any children?',
    type: 'radio',
    options: [
      { label: 'Yes', value: true },
      { label: 'No', value: false },
    ],
    required: true,
  },
  {
    key: 'numberOfChildren',
    label: 'Number of children',
    text: 'How many children do you have?',
    type: 'number',
    dependency: 'childrenPossession',
    required: true,
  },
  {
    key: 'email',
    label: 'Email',
    text: "What's your email?",
    validations: ['email'],
    required: true,
  },
];

export default mainQuestions;
