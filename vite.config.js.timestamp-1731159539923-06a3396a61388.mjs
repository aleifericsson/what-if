// vite.config.js
import { defineConfig } from "file:///C:/Users/affan/GitRepos/what-if/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/affan/GitRepos/what-if/node_modules/@vitejs/plugin-react/dist/index.mjs";
import fs from "fs";
import path from "path";
var __vite_injected_original_dirname = "C:\\Users\\affan\\GitRepos\\what-if";
var distTempPath = path.resolve(__vite_injected_original_dirname, "dist-temp");
var distPath = path.resolve(__vite_injected_original_dirname, "dist");
var distTempAssets = path.resolve(__vite_injected_original_dirname, "dist-temp/assets");
var distAssets = path.resolve(__vite_injected_original_dirname, "dist/assets");
function updateManifest(contentScriptFileName) {
  const manifestPath = path.resolve(__vite_injected_original_dirname, "public/manifest.json");
  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
  manifest.content_scripts[0].js = [`assets/${contentScriptFileName}`];
  manifest.web_accessible_resources[0].resources[0] = `assets/${contentScriptFileName}`;
  fs.writeFileSync(path.resolve(__vite_injected_original_dirname, "public/manifest.json"), JSON.stringify(manifest, null, 2));
}
function updateManifest2(contentScriptFileName) {
  const manifestPath = path.resolve(__vite_injected_original_dirname, "public/manifest.json");
  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
  manifest.content_scripts[0].css = [`assets/${contentScriptFileName}`];
  manifest.web_accessible_resources[0].resources[1] = `assets/${contentScriptFileName}`;
  fs.writeFileSync(path.resolve(__vite_injected_original_dirname, "dist/manifest.json"), JSON.stringify(manifest, null, 2));
}
function moveFilesToDist() {
  let files = fs.readdirSync(distTempAssets);
  files.forEach((file) => {
    const tempFilePath = path.join(distTempAssets, file);
    const distFilePath = path.join(distAssets, file);
    fs.renameSync(tempFilePath, distFilePath);
  });
  let sourceFilePath = path.resolve(__vite_injected_original_dirname, "dist-temp/content.html");
  let destinationFilePath = path.resolve(__vite_injected_original_dirname, "dist/content.html");
  fs.renameSync(sourceFilePath, destinationFilePath);
  files = fs.readdirSync(path.resolve(__vite_injected_original_dirname, "dist/assets"));
  const contentScriptFile = files.find((file) => file.startsWith("content") && file.endsWith(".js"));
  if (contentScriptFile) {
    updateManifest(contentScriptFile);
  }
  const contentScriptFile2 = files.find((file) => file.startsWith("content") && file.endsWith(".css"));
  if (contentScriptFile2) {
    updateManifest2(contentScriptFile2);
  }
}
function delDistTemp() {
  if (fs.existsSync(distTempPath)) {
    fs.readdirSync(distTempPath).forEach((file) => {
      const filePath = path.join(distTempPath, file);
      fs.rmSync(filePath, { recursive: true, force: true });
    });
  } else {
    fs.mkdirSync(distTempPath);
  }
}
var vite_config_default = defineConfig(({ mode }) => {
  const isTempBuild = mode === "content";
  return {
    plugins: [
      react(),
      {
        name: "move-files-plugin",
        closeBundle() {
          if (isTempBuild) {
            moveFilesToDist();
            console.log("\x1B[32m\u2713\x1B[35m files moved to dist!\x1B[0m");
          } else {
            delDistTemp();
          }
        }
      }
    ],
    build: {
      chunkSizeWarningLimit: 1e3,
      outDir: isTempBuild ? "dist-temp" : "dist",
      // Build to dist-temp for second build
      rollupOptions: isTempBuild ? {
        input: {
          content: path.resolve(__vite_injected_original_dirname, "content.html")
        },
        output: {
          entryFileNames: "assets/[name].[hash].js",
          assetFileNames: "assets/[name].[hash].[ext]"
        }
      } : {
        input: {
          setting: path.resolve(__vite_injected_original_dirname, "settings.html")
        },
        output: {
          entryFileNames: "assets/[name].[hash].js",
          assetFileNames: "assets/[name].[hash].[ext]"
        }
      },
      emptyOutDir: isTempBuild ? false : true
      // Only empty outDir for the first build
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxhZmZhblxcXFxHaXRSZXBvc1xcXFx3aGF0LWlmXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxhZmZhblxcXFxHaXRSZXBvc1xcXFx3aGF0LWlmXFxcXHZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9hZmZhbi9HaXRSZXBvcy93aGF0LWlmL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XHJcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XHJcbmltcG9ydCBmcyBmcm9tICdmcyc7XHJcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xyXG5cclxuXHJcbmNvbnN0IGRpc3RUZW1wUGF0aCA9IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdkaXN0LXRlbXAnKTtcclxuY29uc3QgZGlzdFBhdGggPSBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnZGlzdCcpO1xyXG5jb25zdCBkaXN0VGVtcEFzc2V0cyA9IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdkaXN0LXRlbXAvYXNzZXRzJyk7XHJcbmNvbnN0IGRpc3RBc3NldHMgPSBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnZGlzdC9hc3NldHMnKTtcclxuXHJcbmZ1bmN0aW9uIHVwZGF0ZU1hbmlmZXN0KGNvbnRlbnRTY3JpcHRGaWxlTmFtZSkge1xyXG4gIGNvbnN0IG1hbmlmZXN0UGF0aCA9IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdwdWJsaWMvbWFuaWZlc3QuanNvbicpO1xyXG4gIGNvbnN0IG1hbmlmZXN0ID0gSlNPTi5wYXJzZShmcy5yZWFkRmlsZVN5bmMobWFuaWZlc3RQYXRoLCAndXRmOCcpKTtcclxuXHJcbiAgLy8gVXBkYXRlIHRoZSBjb250ZW50IHNjcmlwdCB3aXRoIHRoZSBjb3JyZWN0IGhhc2hlZCBmaWxlbmFtZVxyXG4gIG1hbmlmZXN0LmNvbnRlbnRfc2NyaXB0c1swXS5qcyA9IFtgYXNzZXRzLyR7Y29udGVudFNjcmlwdEZpbGVOYW1lfWBdO1xyXG4gIG1hbmlmZXN0LndlYl9hY2Nlc3NpYmxlX3Jlc291cmNlc1swXS5yZXNvdXJjZXNbMF0gPSBgYXNzZXRzLyR7Y29udGVudFNjcmlwdEZpbGVOYW1lfWA7XHJcbiAgZnMud3JpdGVGaWxlU3luYyhwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAncHVibGljL21hbmlmZXN0Lmpzb24nKSwgSlNPTi5zdHJpbmdpZnkobWFuaWZlc3QsIG51bGwsIDIpKTtcclxufVxyXG5cclxuZnVuY3Rpb24gdXBkYXRlTWFuaWZlc3QyKGNvbnRlbnRTY3JpcHRGaWxlTmFtZSkge1xyXG4gIGNvbnN0IG1hbmlmZXN0UGF0aCA9IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdwdWJsaWMvbWFuaWZlc3QuanNvbicpO1xyXG4gIGNvbnN0IG1hbmlmZXN0ID0gSlNPTi5wYXJzZShmcy5yZWFkRmlsZVN5bmMobWFuaWZlc3RQYXRoLCAndXRmOCcpKTtcclxuXHJcbiAgLy8gVXBkYXRlIHRoZSBjb250ZW50IHNjcmlwdCB3aXRoIHRoZSBjb3JyZWN0IGhhc2hlZCBmaWxlbmFtZVxyXG4gIG1hbmlmZXN0LmNvbnRlbnRfc2NyaXB0c1swXS5jc3MgPSBbYGFzc2V0cy8ke2NvbnRlbnRTY3JpcHRGaWxlTmFtZX1gXTtcclxuICBtYW5pZmVzdC53ZWJfYWNjZXNzaWJsZV9yZXNvdXJjZXNbMF0ucmVzb3VyY2VzWzFdID0gYGFzc2V0cy8ke2NvbnRlbnRTY3JpcHRGaWxlTmFtZX1gO1xyXG5cclxuICAvLyBXcml0ZSB0aGUgdXBkYXRlZCBtYW5pZmVzdCBiYWNrIHRvIHRoZSBkaXN0IGZvbGRlclxyXG4gIGZzLndyaXRlRmlsZVN5bmMocGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ2Rpc3QvbWFuaWZlc3QuanNvbicpLCBKU09OLnN0cmluZ2lmeShtYW5pZmVzdCwgbnVsbCwgMikpO1xyXG59XHJcblxyXG4vLyBGdW5jdGlvbiB0byBjb3B5IGFsbCBmaWxlcyBmcm9tIGRpc3QtdGVtcCB0byBkaXN0XHJcbmZ1bmN0aW9uIG1vdmVGaWxlc1RvRGlzdCgpIHtcclxuICAvLyBSZWFkIGZpbGVzIGZyb20gZGlzdC10ZW1wIGFuZCBtb3ZlIHRvIGRpc3RcclxuICBsZXQgZmlsZXMgPSBmcy5yZWFkZGlyU3luYyhkaXN0VGVtcEFzc2V0cyk7XHJcbiAgZmlsZXMuZm9yRWFjaCgoZmlsZSkgPT4ge1xyXG4gICAgY29uc3QgdGVtcEZpbGVQYXRoID0gcGF0aC5qb2luKGRpc3RUZW1wQXNzZXRzLCBmaWxlKTtcclxuICAgIGNvbnN0IGRpc3RGaWxlUGF0aCA9IHBhdGguam9pbihkaXN0QXNzZXRzLCBmaWxlKTtcclxuICAgIGZzLnJlbmFtZVN5bmModGVtcEZpbGVQYXRoLCBkaXN0RmlsZVBhdGgpOyAvLyBNb3ZlIGZpbGVzXHJcbiAgfSlcclxuICAgIFxyXG4gIGxldCBzb3VyY2VGaWxlUGF0aCA9IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdkaXN0LXRlbXAvY29udGVudC5odG1sJyk7XHJcbiAgbGV0IGRlc3RpbmF0aW9uRmlsZVBhdGggPSBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnZGlzdC9jb250ZW50Lmh0bWwnKTtcclxuXHJcbiAgZnMucmVuYW1lU3luYyhzb3VyY2VGaWxlUGF0aCwgZGVzdGluYXRpb25GaWxlUGF0aCk7XHJcblxyXG4gIGZpbGVzID0gZnMucmVhZGRpclN5bmMocGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ2Rpc3QvYXNzZXRzJykpO1xyXG4gIGNvbnN0IGNvbnRlbnRTY3JpcHRGaWxlID0gZmlsZXMuZmluZChmaWxlID0+IGZpbGUuc3RhcnRzV2l0aCgnY29udGVudCcpICYmIGZpbGUuZW5kc1dpdGgoJy5qcycpKTtcclxuICBpZiAoY29udGVudFNjcmlwdEZpbGUpIHtcclxuICAgIHVwZGF0ZU1hbmlmZXN0KGNvbnRlbnRTY3JpcHRGaWxlKTsgLy8gVXBkYXRlIHRoZSBtYW5pZmVzdC5qc29uXHJcbiAgfVxyXG4gIGNvbnN0IGNvbnRlbnRTY3JpcHRGaWxlMiA9IGZpbGVzLmZpbmQoZmlsZSA9PiBmaWxlLnN0YXJ0c1dpdGgoJ2NvbnRlbnQnKSAmJiBmaWxlLmVuZHNXaXRoKCcuY3NzJykpO1xyXG4gIGlmIChjb250ZW50U2NyaXB0RmlsZTIpIHtcclxuICAgIHVwZGF0ZU1hbmlmZXN0Mihjb250ZW50U2NyaXB0RmlsZTIpOyAvLyBVcGRhdGUgdGhlIG1hbmlmZXN0Lmpzb25cclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRlbERpc3RUZW1wKCkge1xyXG4gIC8vIENoZWNrIGlmIHRoZSBmb2xkZXIgZXhpc3RzXHJcbiAgaWYgKGZzLmV4aXN0c1N5bmMoZGlzdFRlbXBQYXRoKSkge1xyXG4gICAgLy8gUmVhZCBhbGwgdGhlIGZpbGVzIGFuZCBzdWJkaXJlY3RvcmllcyB3aXRoaW4gZGlzdC10ZW1wXHJcbiAgICBmcy5yZWFkZGlyU3luYyhkaXN0VGVtcFBhdGgpLmZvckVhY2goZmlsZSA9PiB7XHJcbiAgICAgIGNvbnN0IGZpbGVQYXRoID0gcGF0aC5qb2luKGRpc3RUZW1wUGF0aCwgZmlsZSk7XHJcbiAgICAgIC8vIFJlbW92ZSBlYWNoIGZpbGUgb3IgZm9sZGVyIGluc2lkZSBkaXN0LXRlbXAgcmVjdXJzaXZlbHlcclxuICAgICAgZnMucm1TeW5jKGZpbGVQYXRoLCB7IHJlY3Vyc2l2ZTogdHJ1ZSwgZm9yY2U6IHRydWUgfSk7XHJcbiAgICB9KTtcclxuICB9IGVsc2Uge1xyXG4gICAgLy8gQ3JlYXRlIHRoZSBmb2xkZXIgaWYgaXQgZG9lc24ndCBleGlzdFxyXG4gICAgZnMubWtkaXJTeW5jKGRpc3RUZW1wUGF0aCk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgbW9kZSB9KSA9PiB7XHJcbiAgXHJcbiAgY29uc3QgaXNUZW1wQnVpbGQgPSBtb2RlID09PSAnY29udGVudCc7IC8vIENoZWNrIGlmIGl0J3MgdGhlIHNlY29uZCBidWlsZFxyXG5cclxuICByZXR1cm4ge1xyXG4gICAgcGx1Z2luczogW1xyXG4gICAgICByZWFjdCgpLFxyXG4gICAgICB7XHJcbiAgICAgICAgbmFtZTogJ21vdmUtZmlsZXMtcGx1Z2luJyxcclxuICAgICAgICAgY2xvc2VCdW5kbGUoKSB7XHJcbiAgICAgICAgICAgIGlmIChpc1RlbXBCdWlsZCkge1xyXG4gICAgICAgICAgICAgIG1vdmVGaWxlc1RvRGlzdCgpOyAvLyBNb3ZlIGZpbGVzIGFmdGVyIHNlY29uZCBidWlsZFxyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdcXHgxYlszMm1cdTI3MTNcXHgxYlszNW0gZmlsZXMgbW92ZWQgdG8gZGlzdCFcXHgxYlswbScpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGRlbERpc3RUZW1wKCk7IC8vIENsZWFuIGRpc3QtdGVtcCBhZnRlciBmaXJzdCBidWlsZFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgXSxcclxuICAgIGJ1aWxkOiB7XHJcbiAgICAgIGNodW5rU2l6ZVdhcm5pbmdMaW1pdDogMTAwMCxcclxuICAgICAgb3V0RGlyOiBpc1RlbXBCdWlsZCA/ICdkaXN0LXRlbXAnIDogJ2Rpc3QnLCAvLyBCdWlsZCB0byBkaXN0LXRlbXAgZm9yIHNlY29uZCBidWlsZFxyXG4gICAgICByb2xsdXBPcHRpb25zOiBpc1RlbXBCdWlsZCA/IHtcclxuICAgICAgICBpbnB1dDoge1xyXG4gICAgICAgICAgY29udGVudDogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ2NvbnRlbnQuaHRtbCcpLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgb3V0cHV0OiB7XHJcbiAgICAgICAgICBlbnRyeUZpbGVOYW1lczogJ2Fzc2V0cy9bbmFtZV0uW2hhc2hdLmpzJyxcclxuICAgICAgICAgIGFzc2V0RmlsZU5hbWVzOiAnYXNzZXRzL1tuYW1lXS5baGFzaF0uW2V4dF0nLFxyXG4gICAgICAgIH0sfToge1xyXG4gICAgICAgICAgaW5wdXQ6IHtcclxuICAgICAgICAgICAgc2V0dGluZzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ3NldHRpbmdzLmh0bWwnKSxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBvdXRwdXQ6IHtcclxuICAgICAgICAgICAgZW50cnlGaWxlTmFtZXM6ICdhc3NldHMvW25hbWVdLltoYXNoXS5qcycsXHJcbiAgICAgICAgICAgIGFzc2V0RmlsZU5hbWVzOiAnYXNzZXRzL1tuYW1lXS5baGFzaF0uW2V4dF0nLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICBlbXB0eU91dERpcjogaXNUZW1wQnVpbGQgPyBmYWxzZSA6IHRydWUsIC8vIE9ubHkgZW1wdHkgb3V0RGlyIGZvciB0aGUgZmlyc3QgYnVpbGRcclxuICAgIH0sXHJcbiAgfTtcclxufSk7Il0sCiAgIm1hcHBpbmdzIjogIjtBQUF5UixTQUFTLG9CQUFvQjtBQUN0VCxPQUFPLFdBQVc7QUFDbEIsT0FBTyxRQUFRO0FBQ2YsT0FBTyxVQUFVO0FBSGpCLElBQU0sbUNBQW1DO0FBTXpDLElBQU0sZUFBZSxLQUFLLFFBQVEsa0NBQVcsV0FBVztBQUN4RCxJQUFNLFdBQVcsS0FBSyxRQUFRLGtDQUFXLE1BQU07QUFDL0MsSUFBTSxpQkFBaUIsS0FBSyxRQUFRLGtDQUFXLGtCQUFrQjtBQUNqRSxJQUFNLGFBQWEsS0FBSyxRQUFRLGtDQUFXLGFBQWE7QUFFeEQsU0FBUyxlQUFlLHVCQUF1QjtBQUM3QyxRQUFNLGVBQWUsS0FBSyxRQUFRLGtDQUFXLHNCQUFzQjtBQUNuRSxRQUFNLFdBQVcsS0FBSyxNQUFNLEdBQUcsYUFBYSxjQUFjLE1BQU0sQ0FBQztBQUdqRSxXQUFTLGdCQUFnQixDQUFDLEVBQUUsS0FBSyxDQUFDLFVBQVUscUJBQXFCLEVBQUU7QUFDbkUsV0FBUyx5QkFBeUIsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxJQUFJLFVBQVUscUJBQXFCO0FBQ25GLEtBQUcsY0FBYyxLQUFLLFFBQVEsa0NBQVcsc0JBQXNCLEdBQUcsS0FBSyxVQUFVLFVBQVUsTUFBTSxDQUFDLENBQUM7QUFDckc7QUFFQSxTQUFTLGdCQUFnQix1QkFBdUI7QUFDOUMsUUFBTSxlQUFlLEtBQUssUUFBUSxrQ0FBVyxzQkFBc0I7QUFDbkUsUUFBTSxXQUFXLEtBQUssTUFBTSxHQUFHLGFBQWEsY0FBYyxNQUFNLENBQUM7QUFHakUsV0FBUyxnQkFBZ0IsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxVQUFVLHFCQUFxQixFQUFFO0FBQ3BFLFdBQVMseUJBQXlCLENBQUMsRUFBRSxVQUFVLENBQUMsSUFBSSxVQUFVLHFCQUFxQjtBQUduRixLQUFHLGNBQWMsS0FBSyxRQUFRLGtDQUFXLG9CQUFvQixHQUFHLEtBQUssVUFBVSxVQUFVLE1BQU0sQ0FBQyxDQUFDO0FBQ25HO0FBR0EsU0FBUyxrQkFBa0I7QUFFekIsTUFBSSxRQUFRLEdBQUcsWUFBWSxjQUFjO0FBQ3pDLFFBQU0sUUFBUSxDQUFDLFNBQVM7QUFDdEIsVUFBTSxlQUFlLEtBQUssS0FBSyxnQkFBZ0IsSUFBSTtBQUNuRCxVQUFNLGVBQWUsS0FBSyxLQUFLLFlBQVksSUFBSTtBQUMvQyxPQUFHLFdBQVcsY0FBYyxZQUFZO0FBQUEsRUFDMUMsQ0FBQztBQUVELE1BQUksaUJBQWlCLEtBQUssUUFBUSxrQ0FBVyx3QkFBd0I7QUFDckUsTUFBSSxzQkFBc0IsS0FBSyxRQUFRLGtDQUFXLG1CQUFtQjtBQUVyRSxLQUFHLFdBQVcsZ0JBQWdCLG1CQUFtQjtBQUVqRCxVQUFRLEdBQUcsWUFBWSxLQUFLLFFBQVEsa0NBQVcsYUFBYSxDQUFDO0FBQzdELFFBQU0sb0JBQW9CLE1BQU0sS0FBSyxVQUFRLEtBQUssV0FBVyxTQUFTLEtBQUssS0FBSyxTQUFTLEtBQUssQ0FBQztBQUMvRixNQUFJLG1CQUFtQjtBQUNyQixtQkFBZSxpQkFBaUI7QUFBQSxFQUNsQztBQUNBLFFBQU0scUJBQXFCLE1BQU0sS0FBSyxVQUFRLEtBQUssV0FBVyxTQUFTLEtBQUssS0FBSyxTQUFTLE1BQU0sQ0FBQztBQUNqRyxNQUFJLG9CQUFvQjtBQUN0QixvQkFBZ0Isa0JBQWtCO0FBQUEsRUFDcEM7QUFDRjtBQUVBLFNBQVMsY0FBYztBQUVyQixNQUFJLEdBQUcsV0FBVyxZQUFZLEdBQUc7QUFFL0IsT0FBRyxZQUFZLFlBQVksRUFBRSxRQUFRLFVBQVE7QUFDM0MsWUFBTSxXQUFXLEtBQUssS0FBSyxjQUFjLElBQUk7QUFFN0MsU0FBRyxPQUFPLFVBQVUsRUFBRSxXQUFXLE1BQU0sT0FBTyxLQUFLLENBQUM7QUFBQSxJQUN0RCxDQUFDO0FBQUEsRUFDSCxPQUFPO0FBRUwsT0FBRyxVQUFVLFlBQVk7QUFBQSxFQUMzQjtBQUNGO0FBRUEsSUFBTyxzQkFBUSxhQUFhLENBQUMsRUFBRSxLQUFLLE1BQU07QUFFeEMsUUFBTSxjQUFjLFNBQVM7QUFFN0IsU0FBTztBQUFBLElBQ0wsU0FBUztBQUFBLE1BQ1AsTUFBTTtBQUFBLE1BQ047QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNMLGNBQWM7QUFDWCxjQUFJLGFBQWE7QUFDZiw0QkFBZ0I7QUFDaEIsb0JBQVEsSUFBSSxvREFBK0M7QUFBQSxVQUM3RCxPQUFPO0FBQ0wsd0JBQVk7QUFBQSxVQUNkO0FBQUEsUUFDSjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsSUFDQSxPQUFPO0FBQUEsTUFDTCx1QkFBdUI7QUFBQSxNQUN2QixRQUFRLGNBQWMsY0FBYztBQUFBO0FBQUEsTUFDcEMsZUFBZSxjQUFjO0FBQUEsUUFDM0IsT0FBTztBQUFBLFVBQ0wsU0FBUyxLQUFLLFFBQVEsa0NBQVcsY0FBYztBQUFBLFFBQ2pEO0FBQUEsUUFDQSxRQUFRO0FBQUEsVUFDTixnQkFBZ0I7QUFBQSxVQUNoQixnQkFBZ0I7QUFBQSxRQUNsQjtBQUFBLE1BQUUsSUFBRztBQUFBLFFBQ0gsT0FBTztBQUFBLFVBQ0wsU0FBUyxLQUFLLFFBQVEsa0NBQVcsZUFBZTtBQUFBLFFBQ2xEO0FBQUEsUUFDQSxRQUFRO0FBQUEsVUFDTixnQkFBZ0I7QUFBQSxVQUNoQixnQkFBZ0I7QUFBQSxRQUNsQjtBQUFBLE1BQ0Y7QUFBQSxNQUNGLGFBQWEsY0FBYyxRQUFRO0FBQUE7QUFBQSxJQUNyQztBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=