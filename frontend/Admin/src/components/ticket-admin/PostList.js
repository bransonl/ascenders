import React from 'react';
import { 
    List, 
    Datagrid, 
    TextField,
    ReferenceField, 
    EditButton,

    Edit,
    SimpleForm,
    DisabledInput,
    ReferenceInput,
    TextInput,
    LongTextInput,
    SelectInput,

    Filter
} from 'react-admin';

const PostFilter = (props) => (
    <Filter {...props} >
        <TextInput label="Search" source="q" alwaysOn />
        <referenceInput label="User" source="userId" reference="users" allowEmpty>
            <SelectInput optionText="name" />
        </referenceInput>
    </Filter>
)

export const PostEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <ReferenceInput source="userId" reference="users">
                <SelectInput optionText="name" />
            </ReferenceInput>
            <TextInput source="title" />
            <LongTextInput source="body" />
        </SimpleForm>
    </Edit>
);

export const PostList = props => (
    <List 
    filters={<PostFilter />}
    exporter={false} 
    {...props}
    >
        <Datagrid>
            <TextField source="id" />
            <ReferenceField source="userId" reference="users">
                <TextField source="name" />
            </ReferenceField>
            <TextField source="title" />
            <EditButton />
        </Datagrid>
    </List>
);

