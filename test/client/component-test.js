// // Mocking window and document object:
// require('./dom-mock')('<html><body></body></html>');
//
// var jsdom = require('mocha-jsdom');
// var assert = require('assert');
// var React = require('react');
// var TestUtils = require('react-addons-test-utils');
//
// describe('Testing my div', function() {
//   jsdom({ skipWindowCheck: true });
//
//   it('should contain text: Lovely! Here it is - my very first React component!', function() {
//     var TaskIndex = require('../src/app/js/components/tasks/Tasksindex.js');
//     var myDiv = TestUtils.renderIntoDocument(<TaskIndex />);
//     var divText = TestUtils.findRenderedDOMComponentWithTag(myDiv, 'span');
//
//     assert.equal(divText.textContent, 'Lovely! Here it is - my very first React component!');
//   });
// });
