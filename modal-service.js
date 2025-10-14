            service.showModal = function(showModalContext) {
                // We don't want to do anything if there's no context
                if (showModalContext == null) {
                    logger.warn("showModal() was called but no context was provided!");
                    return;
                }

                // Pull values out of the context
                const component = showModalContext.component;
                const templateUrl = showModalContext.templateUrl;
                const controllerFunc = showModalContext.controllerFunc;
                const resolveObj = showModalContext.resolveObj || {};
                let closeCallback = showModalContext.closeCallback;
                let dismissCallback = showModalContext.dismissCallback;
                const windowClass = showModalContext.windowClass ? showModalContext.windowClass : "";

                const modalId = `modal-${uuid()}`;
                resolveObj.modalId = () => {
                    return modalId;
                };

                const modal = {
                    ariaLabelledBy: "modal-title",
                    ariaDescribedBy: "modal-body",
                    resolve: resolveObj,
                    size: showModalContext.size,
                    keyboard: showModalContext.keyboard ? showModalContext.keyboard : true,
                    backdrop: showModalContext.backdrop ? showModalContext.backdrop : 'static',
                    windowClass: `${windowClass} ${modalId} animated fadeIn fastest fb-transition draggablemodal`,
                    animation: true
                };

                if (component != null && component.length !== 0) {
                    modal.component = component;
                } else {
                    modal.templateUrl = templateUrl;
                    modal.controller = controllerFunc;
                }

                // Show the modal
                const modalInstance = $uibModal.open(modal);

                // If no callbacks were defined, create blank ones. This avoids a console error
                if (typeof closeCallback !== "function") {
                    closeCallback = () => {};
                }
                if (typeof dismissCallback !== "function") {
                    dismissCallback = () => {};
                }

                const renderedPromise = modalInstance.rendered.then(() => {
                    const modalNode = $(`.${modalId}`);
                    modalNode.removeClass("animated fadeIn fastest");

                    const modalScope = angular.element(`.${modalId}`)?.scope();

                    if (showModalContext.autoSlide !== false) {
                        modalScope?.$on("modal.closing", function() {
                            removeModal();
                        });
                    }

                    return {
                        element: modalNode.children(),
                        name: showModalContext.breadcrumbName ?? "",
                        id: modalId,
                        instance: modalInstance,
                        onSaveAll: () => {
                            if (modalScope?.save) {
                                modalScope.save();
                            }
                        }
                    };
                });

                if (showModalContext.autoSlide !== false) {
                    addModal(renderedPromise);
                }

                // Handle when the modal is exited
                modalInstance.result.then(closeCallback, dismissCallback);
            };
