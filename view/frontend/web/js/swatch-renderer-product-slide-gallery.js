/**
 * Origin: Magento_Swatches/.../swatch-renderer.js
 * Modification type: extend
 * List of modifications:
 * - adjust updateBaseImage for productSlideGallery custom component
 */
define(['jquery'], function ($) {
    'use strict';

    return function (swatchRenderer) {
        $.widget('mage.SwatchRenderer', swatchRenderer, {
            /**
             * @param {*} images
             * @param {*} context
             * @param {*} isInProductView
             * @returns
             */
            updateBaseImage: function (images, context, isInProductView) {
                if (isInProductView) {
                    var slideGallery = context.find(this.options.mediaGallerySelector);

                    if (!slideGallery.hasClass('loaded')) {
                        slideGallery.on('gallery:loaded', function () {
                            this.updateBaseImage(images, context, isInProductView);
                        }.bind(this));

                        return;
                    }

                    var imagesToUpdate = images.length ? this._setImageType($.extend(true, [], images)) : [];

                    /**
                     * Check imagesToUpdate[0].img as mediaGalleryInitial: [{}]
                     * and [{}] can be passed with length = 1 but empty
                     */
                    if (imagesToUpdate.length && imagesToUpdate[0] && imagesToUpdate[0].img) {
                        slideGallery.trigger('updateImages', {
                            'images': imagesToUpdate
                        });
                    }
                }
            }
        });

        return $.mage.SwatchRenderer;
    };
});
