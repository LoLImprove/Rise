import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import Analysis from "../components/Analysis.jsx";

export const composer = ({ context, replay, analysis }, onData) => {
  const {Meteor, Collections} = context();

  const generalNote = analysis.generalNote();
  const timelineEntries = analysis.timelineEntries();

  if (analysis && replay && generalNote && timelineEntries) {
    onData(null, {replay, analysis, generalNote, timelineEntries });
  } else {
    onData();
  }

};

export default composeAll(
  composeWithTracker(composer),
  useDeps()
)(Analysis);

