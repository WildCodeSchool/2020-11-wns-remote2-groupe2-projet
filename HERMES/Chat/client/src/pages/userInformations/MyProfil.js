import { Avatar } from '@chakra-ui/avatar';
import { ButtonGroup, IconButton } from '@chakra-ui/button';
import { CheckIcon, CloseIcon, EditIcon } from '@chakra-ui/icons';
import { Box, Flex, Heading } from '@chakra-ui/layout';
import React from 'react';
import { useMessageState } from '../../context/message';
import { Editable, EditableInput, EditablePreview, useEditableControls } from '@chakra-ui/editable';

export default function MyProfil() {
	const { user } = useMessageState();

	const baseURL = process.env.REACT_APP_BASE_URL || '';

	const CustomControlsUsername = () => {
		/* Here's a custom control */
		function EditableControls() {
			const { isEditing, getSubmitButtonProps, getCancelButtonProps, getEditButtonProps } = useEditableControls();

			return isEditing ? (
				<ButtonGroup justifyContent="center" size="sm">
					<IconButton icon={<CheckIcon />} {...getSubmitButtonProps()} />
					<IconButton icon={<CloseIcon />} {...getCancelButtonProps()} />
				</ButtonGroup>
			) : (
				<Flex justifyContent="center">
					<IconButton size="sm" icon={<EditIcon />} {...getEditButtonProps()} />
				</Flex>
			);
		}

		return (
			<Editable
				textAlign="center"
				defaultValue={user?.username}
				fontSize="2xl"
				isPreviewFocusable={false}
				display="flex"
				justifyContent="space-between"
				width="70%"
			>
				<EditablePreview />
				<EditableInput />
				<EditableControls />
			</Editable>
		);
	};

	const CustomControlsEmail = () => {
		/* Here's a custom control */
		function EditableControls() {
			const { isEditing, getSubmitButtonProps, getCancelButtonProps, getEditButtonProps } = useEditableControls();

			return isEditing ? (
				<ButtonGroup justifyContent="center" size="sm">
					<IconButton icon={<CheckIcon />} {...getSubmitButtonProps()} />
					<IconButton icon={<CloseIcon />} {...getCancelButtonProps()} />
				</ButtonGroup>
			) : (
				<Flex justifyContent="center">
					<IconButton size="sm" icon={<EditIcon />} {...getEditButtonProps()} />
				</Flex>
			);
		}

		return (
			<Editable
				textAlign="center"
				defaultValue={user?.email}
				fontSize="2xl"
				isPreviewFocusable={false}
				display="flex"
				justifyContent="space-between"
				width="70%"
			>
				<EditablePreview />
				<EditableInput />
				<EditableControls />
			</Editable>
		);
	};

	const CustomControlsProfilImage = () => {
		/* Here's a custom control */
		function EditableControls() {
			const { isEditing, getSubmitButtonProps, getCancelButtonProps, getEditButtonProps } = useEditableControls();

			return isEditing ? (
				<ButtonGroup justifyContent="center" size="sm">
					<IconButton icon={<CheckIcon />} {...getSubmitButtonProps()} />
					<IconButton icon={<CloseIcon />} {...getCancelButtonProps()} />
				</ButtonGroup>
			) : (
				<Flex justifyContent="center">
					<IconButton size="sm" icon={<EditIcon />} {...getEditButtonProps()} />
				</Flex>
			);
		}

		return (
			<Editable
				children={<Avatar src={baseURL + user?.imageUrl} />}
				textAlign="center"
				defaultValue="Rasengan ⚡️"
				fontSize="2xl"
				isPreviewFocusable={false}
				display="flex"
				justifyContent="space-between"
				width="70%"
			>
				<EditablePreview />
				<EditableInput />
				<EditableControls />
			</Editable>
		);
	};

	return (
		<Box>
			<Heading textAlign="center">Mon profil</Heading>
			<Flex display="flex" flexDirection="column" alignItems="center">
				<CustomControlsUsername />
				<CustomControlsEmail />
				<CustomControlsProfilImage />
			</Flex>
		</Box>
	);
}
