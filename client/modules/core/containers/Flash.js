import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import {AnimateComposer} from '/client/composers/Animate.jsx';
import FlashComponent from '../components/Flash.jsx';

const composer = ({context}, onData) => {
  const {Meteor, Flash} = context();

  const messages = Flash.collection.find({seen: false}).fetch();
  onData(null, {messages, Flash});
};

export default composeAll(
  AnimateComposer, // Needs to always be first
  composeWithTracker(composer),
  useDeps()
)(FlashComponent);
