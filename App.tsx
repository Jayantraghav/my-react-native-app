import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    Button,
    ScrollView,
    TouchableOpacity,
    Modal,
    StyleSheet,
    Image,
} from "react-native";

const App = () => {
    const [notes, setNotes] = useState([]);
    const [selectedNote, setSelectedNote] = useState(null);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [modalVisible, setModalVisible] = useState(false);

    const handleSaveNote = () => {
        if (selectedNote) {
            const updatedNotes = notes.map((note) =>
                note.id === selectedNote.id
                    ? { ...note, title, content }
                    : note
            );
            setNotes(updatedNotes);
            setSelectedNote(null);
        } else {
            const newNote = {
                id: Date.now(),
                title,
                content,
            };
            setNotes([...notes, newNote]);
        }
        setTitle("");
        setContent("");
        setModalVisible(false);
    };

    const handleEditNote = (note) => {
        setSelectedNote(note);
        setTitle(note.title);
        setContent(note.content);
        setModalVisible(true);
    };

    const handleDeleteNote = (note) => {
        const updatedNotes = notes.filter((item) => item.id !== note.id);
        setNotes(updatedNotes);
        setSelectedNote(null);
        setModalVisible(false);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>My Notes</Text>
            <ScrollView style={styles.noteList}>
                {notes.map((note) => (
                    <TouchableOpacity
                        key={note.id}
                        onPress={() => handleEditNote(note)}
                        style={styles.noteCard}
                    >
                        <Text style={styles.noteTitle}>{note.title}</Text>
                        <Text numberOfLines={1} style={styles.noteContent}>
                            {note.content}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            <TouchableOpacity
                style={styles.addButton}
                onPress={() => {
                    setTitle("");
                    setContent("");
                    setModalVisible(true);
                }}
            >
                <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>

            <Modal visible={modalVisible} animationType="slide" transparent={true}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <TextInput
                            style={styles.input}
                            placeholder="Note Title"
                            value={title}
                            onChangeText={setTitle}
                        />
                        <TextInput
                            style={styles.textArea}
                            placeholder="Note Content"
                            value={content}
                            onChangeText={setContent}
                            multiline
                        />
                        <View style={styles.buttonRow}>
                            <Button title="Save" onPress={handleSaveNote} color="#007AFF" />
                            <Button
                                title="Cancel"
                                onPress={() => setModalVisible(false)}
                                color="#FF3B30"
                            />
                            {selectedNote && (
                                <Button
                                    title="Delete"
                                    onPress={() => handleDeleteNote(selectedNote)}
                                    color="#FF9500"
                                />
                            )}
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#F2F2F7",
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
        color: "#1C1C1E",
    },
    noteList: {
        flex: 1,
    },
    noteCard: {
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
    },
    noteTitle: {
        fontSize: 18,
        fontWeight: "600",
        color: "#333",
    },
    noteContent: {
        color: "#666",
        marginTop: 5,
    },
    addButton: {
        backgroundColor: "#007AFF",
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        bottom: 30,
        right: 30,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    addButtonText: {
        fontSize: 30,
        color: "white",
        fontWeight: "bold",
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
        margin: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: "#E0E0E0",
        marginBottom: 15,
        fontSize: 18,
        paddingVertical: 8,
    },
    textArea: {
        borderWidth: 1,
        borderColor: "#E0E0E0",
        borderRadius: 5,
        padding: 10,
        height: 120,
        textAlignVertical: "top",
        marginBottom: 20,
    },
    buttonRow: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
});

export default App;
