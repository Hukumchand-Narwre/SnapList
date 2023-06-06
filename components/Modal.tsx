"use-client";
import { FormEvent, Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useModalStore } from "@/store/ModalStore";
import { useBoardStore } from "@/store/BoardStore";
import TaskTypeRadioGroup from "./TaskTypeRadioGroup";
import Image from "next/image";
import { PhotoIcon } from "@heroicons/react/24/solid";

function Modal() {
  const imagePickerRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [newTaskInput, setNewTaskInput, newTaskType, addTask] = useBoardStore(
    (state) => [
      state.newTaskInput,
      state.setNewTaskInput,
      state.newTaskType,
      state.addTask,
    ]
  );
  const [isOpen, closeModal] = useModalStore((state) => [
    state.isOpen,
    state.closeModal,
  ]);
  // const handleImageChange = (event: any) => {
  //   const file = event.target.files[0];
  //   setSelectedImage(file);
  // };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!newTaskInput) return;
    addTask(newTaskInput, newTaskType);
    closeModal();
  };
  return (
    // Use the `Transition` component at the root level
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        className="relative z-10"
        as="form"
        onSubmit={handleSubmit}
        onClose={() => closeModal()}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30 "></div>
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto ">
          <div className=" flex min-h-full items-center justify-center p-4 text-center ">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Panel className=" w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all ">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 pb-2 "
                >
                  Add a Task
                </Dialog.Title>
                <div className="mt-2">
                  <input
                    type="text"
                    value={newTaskInput}
                    onChange={(e) => setNewTaskInput(e.target.value)}
                    placeholder="Enter a task here..."
                    className="w-full border border-gray-300 rounded-md outline-none p-5 "
                  />
                </div>
                <TaskTypeRadioGroup />
                {/* <div className="mt-2">
                  <button
                    type="button"
                    onClick={() => {
                      imagePickerRef.current?.click()!;
                    }}
                    className="w-full border border-gray-300 rounded-md outline-none p-5 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 "
                  >
                    <PhotoIcon className="h-6 w-6 mr-2 inline-block " /> Upload
                    Image
                  </button>
                  {selectedImage && (
                    <Image
                      alt="Uploaded image"
                      width={200}
                      height={200}
                      className="w-full h-44 object-cover mt-2 filter hover:grayscale transition-all duration-150 cursor-not-allowed"
                      src={URL.createObjectURL(selectedImage)}
                      onClick={() => {
                        setSelectedImage(null);
                      }}
                    />
                  )}
                  <input
                    type="file"
                    hidden
                    ref={imagePickerRef}
                    accept="image/"
                    onChange={handleImageChange}
                  />
                </div> */}
                <div className="mt-4">
                  <button
                    type="submit"
                    disabled={!newTaskInput}
                    className=" inline-flex justify-center rounded-md border border-transparent disabled:bg-gray-100 disabled:text-gray-300 disabled:cursor-not-allowed bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  >
                    Add Task
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default Modal;
