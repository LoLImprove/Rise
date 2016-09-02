import {Replay} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function() {
  Meteor.methods({
    'replay:create'(data) {
      check(data, {
        replay_id: null, // Should be null
        video_id: String,
        victory: Boolean,
        champion: String,
        matchup: String,
        lane: String,
        kda: String,
        duration: String,
        patch: String,
        description: String,
        replay_file: Match.Any,
      });

		  const {video_id, victory, champion, matchup, lane, kda, duration, patch, description, replay_file} = data;

      let replay = new Replay();
      replay.set({
        user_id: this.userId,
        video_id,
        victory,
        meta_information: { champion, matchup, lane, kda },
        description,
        duration,
        patch,
        replay_file
      });

      Security.can(this.userId).insert(replay).for(Replay.getCollection()).throw();

      if (replay.validate()) {
        replay.save();
      } else {
        throw new Meteor.Error("ReplayError", replay.getValidationErrors());
      }

      return replay;
    },
    'replay:update'(data) {
      check(data, {
        replay_id: String,
        video_id: String,
        victory: Boolean,
        champion: String,
        matchup: String,
        lane: String,
        kda: String,
        duration: String,
        patch: String,
        description: String,
        replay_file: Match.Any,
      });

		  const {replay_id, video_id, victory, champion, matchup, lane, kda, duration, patch, description, replay_file} = data;

      Security.can(this.userId).update(replay_id).for(Replay.getCollection()).throw();

      let replay = Replay.findOne({ _id: replay_id });

      if (!replay)  {
        throw new Meteor.Error("ReplayError", "This replay does not exists");
      }

      replay.set({
        //user_id: this.userId,
        video_id,
        victory,
        meta_information: { champion, matchup, lane, kda },
        description,
        duration,
        patch,
        replay_file
      });

      if (replay.validate()) {
        replay.save();
      } else {
        throw new Meteor.Error("ReplayError", replay.getValidationErrors());
      }

      return replay;
    }
  });
}
