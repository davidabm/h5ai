(function () {
'use strict';

var ID = 'view/viewmode';
var DEPS = ['_', '$', 'core/resource', 'core/settings', 'core/store', 'view/content', 'view/sidebar'];

describe('module \'' + ID + '\'', function () {

    before(function () {

        this.definition = modulejs._private.definitions[ID];

        this.xSettings = {
            view: {}
        };
        this.xResource = {
            image: sinon.stub().returns(util.uniqPath('-image.png'))
        };
        this.xStore = {
            get: sinon.stub(),
            put: sinon.stub()
        };
        this.xContent = {$view: null};
        this.xSidebar = {$el: null};

        this.applyFn = function () {

            this.xResource.image.reset();
            this.xStore.get.reset();
            this.xStore.put.reset();

            return this.definition.fn(_, $, this.xResource, this.xSettings, this.xStore, this.xContent, this.xSidebar);
        };
    });

    after(function () {

        util.restoreHtml();
    });

    beforeEach(function () {

        util.restoreHtml();
        this.xContent.$view = $('<div id="view"/>').appendTo('body');
        this.xSidebar.$el = $('<div id="sidebar"/>').appendTo('body');
    });

    describe('definition', function () {

        it('is defined', function () {

            assert.isPlainObject(this.definition);
        });

        it('has correct id', function () {

            assert.strictEqual(this.definition.id, ID);
        });

        it('requires correct', function () {

            assert.deepEqual(this.definition.deps, DEPS);
        });

        it('args for each request', function () {

            assert.strictEqual(this.definition.deps.length, this.definition.fn.length);
        });

        it('has no instance', function () {

            assert.notProperty(modulejs._private.instances, ID);
        });

        it('inits without errors', function () {

            this.applyFn();
        });
    });

    describe('application', function () {

        it('returns undefined', function () {

            var instance = this.applyFn();
            assert.isUndefined(instance);
        });

        it('adds HTML to #sidebar', function () {

            this.applyFn();
            assert.lengthOf($('#sidebar > .block > .l10n-view'), 1);
        });

        it('adds Style to head', function () {

            var styleTagCount = $('head > style').length;
            this.applyFn();
            assert.lengthOf($('head > style'), styleTagCount + 1);
        });
    });
});

}());