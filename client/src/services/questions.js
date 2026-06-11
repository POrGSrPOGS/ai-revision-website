export async function loadQuestion(filters) {
    try {
        const queryString = filters ? `?${filters}` : "";
        const response = await fetch(`/api/questions${queryString}`);
        
        const data = await response.json();
        return data

    } catch (error) {
        console.error("Failed to load question:");
    }
}

export async function answerQuestion(answer) {
    try {
        const response = await fetch(`/api/questions/answer`, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
                answer: answer,
            }),
        });

        const data = await response.json();
        return data

    } catch (error) {
        console.error("Failed to answer question")
    }
}