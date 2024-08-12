// code mapping as per language code in rapidAPI/judgeO
const languageCodeMap = {
    cpp: 54,
    python: 92,
    javascript: 93,
    java: 91,
  };
  
  async function getSubmission(tokenId, callback) {
    const url = `https://judge0-ce.p.rapidapi.com/submissions/${tokenId}?base64_encoded=true&fields=*`;
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "0be74671f0mshf7dd6016a879ef9p11caacjsn002cb2dd108b",
        "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
      },
    };
  
    try {
      const response = await fetch(url, options);
      const result = await response.json();
      return result;
    } catch (error) {
      callback({ apiStatus: "error", message: JSON.stringify(error) });
    }
  }
  
  // this function will make a submission and handle the status of that submission
  export async function makeSubmission({ code, language, callback, stdin }) {
    const url = "https://judge0-ce.p.rapidapi.com/submissions?fields=*";
    const httpOptions = {
      method: "POST",
      headers: {
        "x-rapidapi-key": "0be74671f0mshf7dd6016a879ef9p11caacjsn002cb2dd108b",
        "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
        
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        language_id: languageCodeMap[language],
        source_code: code,
        stdin: stdin,
      }),
    };
  
    /*
    generic response for this api 
    {
      apiStatus:'loading' | 'error' | 'success',
      data:response,
      message:'runtime error' | 'compilation error'
    }
  */
  
    try {
      callback({ apiStatus: "loading" });
      const response = await fetch(url, httpOptions);
      const result = await response.json();
      const tokenId = result.token;
      let statusCode = 1; // in queue
      let apiSubmissionResult;
      while (statusCode === 1 || statusCode === 2) {
        try {
          apiSubmissionResult = await getSubmission(tokenId);
          statusCode = apiSubmissionResult.status.id;
        } catch (error) {
          callback({ apiStatus: "error", message: JSON.stringify(error) });
          return;
        }
      }
      if (apiSubmissionResult) {
        callback({ apiStatus: "success", data: apiSubmissionResult });
      }
    } catch (error) {
      callback({
        apiStatus: "error",
        message: JSON.stringify(error),
      });
    }
  }