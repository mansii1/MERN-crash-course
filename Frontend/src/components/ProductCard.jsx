import {
    Box,
    Heading,
    HStack,
    IconButton,
    Image,
    Text,
    useColorModeValue,
    useDisclosure,
    useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { useProductStore } from "../../store/product";
import UpdateModal from "./UpdateModal";

const ProductCard = ({ product }) => {
    const textColor = useColorModeValue("gray.600", "gray.200");
    const bg = useColorModeValue("white", "gray.800");
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { deleteProduct } = useProductStore();
    const [ updateProduct, setUpdateProduct ] = useState(product);

    const deleteHandler = async () => {
        const { success, message } = await deleteProduct(product._id);
        if (success) {
            toast({
                title: "Product deleted",
                description: message,
                status: "success",
                isClosable: true,
            });
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
        <Box
            shadow="lg"
            rounded="lg"
            transition="all 0.2s"
            overflow="hidden"
            hover={{ transform: "translateY(-5px)", shadow: "xl" }}
        >
            <Image src={product.image} alt={product.name} w="full" h={48} objectFit="cover" />
            <Box p={4} bg={bg}>
                <Heading as="h3" size="md" mb={2}>
                    {product.name}
                </Heading>
                <Text fontWeight="bold" fontSize="xl" mb={4} color={textColor}>
                    ${product.price}
                </Text>

                <HStack>
                    <IconButton icon={<EditIcon />} colorScheme="blue" onClick={onOpen} />
                    <IconButton icon={<DeleteIcon />} colorScheme="red" onClick={deleteHandler} />
                </HStack>
            </Box>
            {isOpen && <UpdateModal
                isOpen={isOpen}
                onClose={onClose}
                updateProduct={updateProduct}
                setUpdateProduct={setUpdateProduct}
            />}
        </Box>
    );
};

export default ProductCard;
