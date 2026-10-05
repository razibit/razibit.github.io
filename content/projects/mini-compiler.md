---
title: "Mini Compiler — C, Flex, and Bison Front End with a Browser Interface"
label: "Compiler/course project"
summary: "An educational compiler front end with scoped semantic checks, three-address code, and a Flask interface over the same executable."
role: "Team implementation contributor"
contribution: "Initial compiler front end, Flask interface, WSL path, and documentation."
stack: "C · Flex · Bison · Flask · WSL"
outcome: "Tokens, AST, scoped checks, and three-address code from one compiler binary."
featured: false
order: 9
repository: "https://github.com/razibit/CC-Lab-Project-razibit-and-the-tokenizers"
---

*Making compiler phases visible from source to intermediate code.*

## Project header

**Category:** Compiler/course project. **Role:** Team implementation contributor. **Timeline:** Documented July–September 2026 work. **Team:** Rajib Dab and Md. Monsur Alam. **Status:** Implemented educational front end.

## Problem and solution

The course required integrated compiler phases for a small specified language. Flex tokenizes input; Bison builds an AST for declarations, assignments, blocks, branches, loops, print statements, and expressions. A scoped symbol table and combined semantic/TAC traversal report errors and produce textual intermediate code.

## My contribution and architecture

I contributed the initial front end, Flask browser interface, Windows/WSL path, documentation, and demonstration assets. GCC/Make builds one compiler binary; Flask invokes that binary through a subprocess and presents its output sections. My teammate contributed later redesign, refactoring, limits, and error handling. Current source includes source-size, timeout, and output limits; these are project capabilities rather than claims that I authored those controls.

## Results and limitations

The CLI and browser expose tokens, AST, symbol table, TAC, diagnostics, and summaries. Precedence declarations address parser conflicts in the documented team design. Fixed arrays and concentrated grammar logic constrain modularity. Functions, arrays, optimization, machine-code generation, and production compiler use are outside scope. The earlier report’s two-traversal wording conflicts with the final/code-supported combined traversal and is not reused.
