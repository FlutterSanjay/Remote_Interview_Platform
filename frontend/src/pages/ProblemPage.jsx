import { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { PROBLEMS } from "../data/problem.js";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import ProblemDescription from "../components/ProblemDescription.jsx";
import OutputPanel from "../components/OutputPanel.jsx";
import CodeEditorPanel from "../components/CodeEditorPanel.jsx";
import { executeCode } from "../lib/piston.js";
import { toast } from "react-toastify";
import confetti from "canvas-confetti";

const ProblemPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [currentProblemId, setCurrentProblemId] = useState("two-sum");
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [code, setCode] = useState(
    PROBLEMS[currentProblemId].starterCode.javascript,
  );

  const [output, setOutput] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  const currentProblem = PROBLEMS[currentProblemId];

  // 🆕 Build runnable code from function + examples
  const buildWrappedCode = (problem, language, userCode) => {
    const examples = problem.examples || [];

    // helper: extract params from "nums=[1,2], target=3"
    const parseParams = (inputStr) => {
      const params = [];
      const parts = inputStr.split(",");

      let current = "";
      let bracket = 0;

      for (let ch of inputStr) {
        if (ch === "[" || ch === "(") bracket++;
        if (ch === "]" || ch === ")") bracket--;
        if (ch === "," && bracket === 0) {
          params.push(current.trim());
          current = "";
        } else current += ch;
      }
      if (current) params.push(current.trim());

      return params.map((p) => p.split("=").pop().trim());
    };

    // -------- JAVASCRIPT ----------
    if (language === "javascript") {
      let runner = "\n\n// AUTO TEST RUNNER\n";
      examples.forEach((ex) => {
        const args = parseParams(ex.input).join(",");
        const fnName = userCode.match(/function\s+(\w+)/)?.[1] || "solution";
        runner += `console.log(${fnName}(${args}));\n`;
      });
      return userCode + runner;
    }

    // -------- PYTHON ----------
    if (language === "python") {
      let runner = "\n\n# AUTO TEST RUNNER\n";
      examples.forEach((ex) => {
        const args = parseParams(ex.input).join(",");
        const fnNameMatch = userCode.match(/def\s+(\w+)/);
        const fnName = fnNameMatch ? fnNameMatch[1] : "solution";
        runner += `print(${fnName}(${args}))\n`;
      });
      return userCode + runner;
    }

    // -------- JAVA ----------
    if (language === "java") {
      let runner = "\n\npublic static void main(String[] args){\n";
      examples.forEach((ex) => {
        const args = parseParams(ex.input).join(",");
        const fnNameMatch = userCode.match(/(\w+)\(/);
        const fnName = fnNameMatch ? fnNameMatch[1] : "solution";
        runner += `System.out.println(${fnName}(${args}));\n`;
      });
      runner += "}\n";
      return userCode + runner;
    }

    return userCode;
  };

  useEffect(() => {
    if (id && PROBLEMS[currentProblemId]) {
      setCurrentProblemId(id);
      setCode(PROBLEMS[id].starterCode[selectedLanguage]);
      setOutput(null);
    }
  }, [id, selectedLanguage]);

  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    console.log("Selected Lang:", newLang);
    setSelectedLanguage(newLang);
    setCode(currentProblem.starterCode[newLang]);
    setOutput(null);
  };

  const handleProblemChange = (newProblemId) => {
    navigate(`/problems/${newProblemId}`);
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 250,
      origin: { x: 0.2, y: 0.6 },
    });

    confetti({
      particleCount: 80,
      spread: 250,
      origin: { x: 0.8, y: 0.6 },
    });
  };

  const normalizeOutput = (output) => {
    // normalize output for comparison (trim whitespace, handle different spacing)
    return output
      .trim()
      .split("\n")
      .map((line) =>
        line
          .trim()
          // remove spaces after [ and before ]
          .replace(/\[\s+/g, "[")
          .replace(/\s+\]/g, "]")
          // normalize spaces around commas to single space after comma
          .replace(/\s*,\s*/g, ","),
      )
      .filter((line) => line.length > 0)
      .join("\n");
  };

  const checkIfTestsPassed = (actualOutput, exepectedOutput) => {
    const normalizedActual = normalizeOutput(actualOutput);
    const normalizedExepectedOutput = normalizeOutput(exepectedOutput);
    return normalizedActual === normalizedExepectedOutput;
  };
  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput(null);

    const wrappedCode = buildWrappedCode(
      currentProblem,
      selectedLanguage,
      code,
    );

    const result = await executeCode(selectedLanguage, wrappedCode);

    setOutput(result);
    setIsRunning(false);

    // check if code executed successfully and matches expected output
    if (result.success) {
      const exepectedOutput = currentProblem.expectedOutput[selectedLanguage];
      const testsPassed = checkIfTestsPassed(result.output, exepectedOutput);

      console.log("Test Passed :", testsPassed);
      if (testsPassed) {
        triggerConfetti();
        toast.success("All tests passed: Great Job!");
      } else {
        toast.error("Tests failed. Check your output!");
      }
    } else {
      toast.error("Code execution failed");
    }
  };;
  return (
    <div className="h-screen bg-base-100 flex flex-col">
      <Navbar />
      <div className="flex-1">
        <PanelGroup direction="horizontal">
          <Panel defaultSize={40} minSize={30}>
            {/* left panel-problem desc */}
            <ProblemDescription
              problem={currentProblem}
              currentProblemId={currentProblemId}
              onProblemChange={handleProblemChange}
              allProblems={Object.values(PROBLEMS)}
            />
          </Panel>
          <PanelResizeHandle className="w-2 bg-base-300 hover:bg-primary transition-colors cursor-col-resize" />

          {/* RIGHT PANEL Code Editor  + Output */}
          <Panel defaultSize={60} minSize={30}>
            <PanelGroup direction="vertical">
              {/* Top panel - Code editor */}
              <Panel defaultSize={60} minSize={30}>
                <CodeEditorPanel
                  selectedLanguage={selectedLanguage}
                  code={code}
                  isRunning={isRunning}
                  onLanguageChange={handleLanguageChange}
                  onCodeChange={setCode}
                  onRunCode={handleRunCode}
                />
              </Panel>
              <PanelResizeHandle className="h-2 bg-base-300 hover:bg-primary transition-colors cursor-row-resize" />
              <Panel defaultSize={40} minSize={30}>
                <OutputPanel output={output} />
              </Panel>
            </PanelGroup>
          </Panel>
        </PanelGroup>
      </div>
    </div>
  );
};;

export default ProblemPage;
