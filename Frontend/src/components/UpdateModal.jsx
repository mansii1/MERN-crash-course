import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    VStack,
} from "@chakra-ui/react";
import React from "react";
import { useProductStore } from "../../store/product";
import { useToast } from "@chakra-ui/react";

const UpdateModal = ({ isOpen, onClose, updateProduct, setUpdateProduct }) => {
    const { updateProductFunc } = useProductStore();
    const toast = useToast();

    const updateHandler = async () => {
        const { success, message } = await updateProductFunc(updateProduct._id, updateProduct);
        if (success) {
            toast({
                title: "Product updated",
                description: message,
                status: "success",
                isClosable: true,
            });
            onClose();
        } else {
            toast({
                title: "Server Error",
                description: message,
                status: "error",
                isClosable: true,
            });
        }
    };



    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Update Product</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <VStack spacing={4}>
                        <Input
                            placeholder="Product Name"
                            name="name"
                            type="text"
                            value={updateProduct?.name}
                            onChange={(e) => setUpdateProduct({ ...updateProduct, name: e.target.value })}
                        />
                        <Input
                            placeholder="Product Price"
                            name="price"
                            type="number"
                            value={updateProduct?.price}
                            onChange={(e) => setUpdateProduct({ ...updateProduct, price: e.target.value })}
                        />
                        <Input
                            placeholder="Product Image"
                            name="image"
                            type="text"
                            value={updateProduct?.image}
                            onChange={(e) => setUpdateProduct({ ...updateProduct, image: e.target.value })}
                        />
                    </VStack>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={updateHandler}>
                        Update
                    </Button>
                    <Button variant="ghost" onClick={onClose}>
                        Cancel
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default UpdateModal;
