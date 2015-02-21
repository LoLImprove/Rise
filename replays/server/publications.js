Rise.publish("rise:replays", function () {
  // TODO: Only the one we need
  return Rise.Replays.find({});
});

Rise.publish("rise:analyses", function () {
  // TODO: Only the one we need
  return Rise.Analyses.find({ status: 'published' });
});
