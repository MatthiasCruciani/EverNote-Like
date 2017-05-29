import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Notes = new Mongo.Collection('notes');

if (Meteor.isServer) {
    Meteor.publish('notes', function notesPublication() {
        return Notes.find({
            owner: this.userId,
        });
    });
}

Meteor.methods({
    'notes.insert'(titre, text, lien, image) {
        check(titre, String);
        check(text, String);
        check(lien, String);
        check(image, String);

        if (! Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }

        Notes.insert({
            titre,
            text,
            lien,
            image,
            createdAt: new Date(),
            owner: Meteor.userId(),
            username: Meteor.user().username,
        });
    },
    'notes.remove'(noteId) {
        check(noteId, String);

        Notes.remove(noteId);
    },
});
