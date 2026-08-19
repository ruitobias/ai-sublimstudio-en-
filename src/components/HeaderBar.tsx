// ============================================================================
// HeaderBar.tsx
// SublimStudio PRO Enterprise
// Version: 4.0
// ============================================================================

import React, {
  FC,
  useCallback,
  useMemo,
  useState,
} from "react";
import { logoSublimStudioSvg, logoSublimStudioPng, faviconPng } from "../assets/logos";

import {
  RotateCcw,
  RotateCw,
  Share2,
  Printer,
  Keyboard,
  Sun,
  Moon,
  Box,
  Grid,
  Zap,
  Cpu,
  LogIn,
  LogOut,
  Sparkles,
} from "lucide-react";

import { PrintableProduct } from "../types";
import { AppMenu } from "./AppMenu";

// ============================================================================
// TYPES
// ============================================================================

export interface UserInfo {
  name: string;
  email: string;
  isPro?: boolean;
}

export interface HeaderBarProps {
  projectTitle: string;
  setProjectTitle: (title: string) => void;

  canvasWidth: number;
  canvasHeight: number;
  setCanvasSize: (width: number, height: number) => void;

  canUndo: boolean;
  canRedo: boolean;

  onUndo(): void;
  onRedo(): void;

  onNewProject(): void;
  onOpenTemplates(): void;

  onExportPNG(): void;

  onOpenAIConsole(): void;

  onOpenWordArtModal?(): void;

  onOpenPresetGallery?(): void;

  onOpenTestRunner?(): void;

  onOpenShortcuts(): void;

  onOpenPrintModal(): void;

  onOpenGangModal(): void;

  onOpenAndroidModal?(): void;

  darkMode: boolean;

  setDarkMode(value: boolean): void;

  show3DViewport: boolean;

  setShow3DViewport(value: boolean): void;

  currentProduct: PrintableProduct;

  setProduct(product: PrintableProduct): void;

  currentUser?: UserInfo | null;

  onOpenAuthModal?(): void;

  onLogout?(): void;

  onOpenAISettings?(): void;
}

// ============================================================================
// PRESETS
// ============================================================================

const CANVAS_PRESETS = [
  {
    label: "A3 Sublimático",
    width: 1080,
    height: 1350,
  },
  {
    label: "Caneca 11oz",
    width: 1200,
    height: 530,
  },
  {
    label: "Camiseta A3",
    width: 1200,
    height: 1600,
  },
  {
    label: "Squeeze",
    width: 1000,
    height: 800,
  },
  {
    label: "Almofada",
    width: 1200,
    height: 1200,
  },
];

// ============================================================================
// DROPDOWNS
// ============================================================================

type DropdownType =
  | null
  | "view"
  | "press"
  | "tools"
  | "window";

// ============================================================================
// COMPONENT
// ============================================================================

export const HeaderBar: FC<HeaderBarProps> = ({
  projectTitle,
  setProjectTitle,

  canvasWidth,
  canvasHeight,
  setCanvasSize,

  canUndo,
  canRedo,

  onUndo,
  onRedo,

  onNewProject,
  onOpenTemplates,

  onExportPNG,

  onOpenAIConsole,

  onOpenWordArtModal,

  onOpenPresetGallery,

  onOpenTestRunner,

  onOpenShortcuts,

  onOpenPrintModal,

  onOpenGangModal,

  onOpenAndroidModal,

  darkMode,
  setDarkMode,

  show3DViewport,
  setShow3DViewport,

  currentProduct,
  setProduct,

  currentUser = null,

  onOpenAuthModal,
  onLogout,
  onOpenAISettings,
}) => {

  // =========================================================================
  // STATES
  // =========================================================================

  const [dropdown, setDropdown] =
    useState<DropdownType>(null);

  // =========================================================================
  // MEMOS
  // =========================================================================

  const currentPreset = useMemo(() => {
    return `${canvasWidth}x${canvasHeight}`;
  }, [canvasWidth, canvasHeight]);

  // =========================================================================
  // CALLBACKS
  // =========================================================================

  const toggleDropdown = useCallback(
    (menu: DropdownType) => {
      setDropdown((old) => (old === menu ? null : menu));
    },
    []
  );

  const closeDropdown = useCallback(() => {
    setDropdown(null);
  }, []);

  const changePreset = useCallback(
    (value: string) => {
      const [w, h] = value.split("x").map(Number);

      setCanvasSize(w, h);
    },
    [setCanvasSize]
  );

  const saveLayout = useCallback(() => {
    const json = JSON.stringify(
      {
        project: projectTitle,
        created: new Date().toISOString(),
        canvas: {
          width: canvasWidth,
          height: canvasHeight,
        },
        product: currentProduct,
      },
      null,
      2
    );

    const blob = new Blob([json], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download =
      projectTitle.replace(/\s+/g, "_") +
      ".sublim";

    link.click();

    URL.revokeObjectURL(url);
  }, [
    projectTitle,
    canvasWidth,
    canvasHeight,
    currentProduct,
  ]);

  const openProject = useCallback(() => {
    const input =
      document.createElement("input");

    input.type = "file";

    input.accept =
      "image/*,.json,.sublim";

    input.click();
  }, []);

  const importImage = useCallback(() => {
    const input =
      document.createElement("input");

    input.type = "file";

    input.accept = "image/*";

    input.click();
  }, []);

  // =========================================================================
  // RENDER
  // =========================================================================

  return (
    <header
      className={[
        "h-12",
        "flex",
        "items-center",
        "justify-between",
        "px-3",
        "border-b",
        "shadow-md",
        "text-xs",
        "select-none",
        "overflow-x-auto",
        "custom-scrollbar",
        darkMode
          ? "bg-[#0B0F17] border-[#1F2937] text-slate-200"
          : "bg-white border-slate-200 text-slate-800",
      ].join(" ")}
    >      {/* ==================================================================== */}
      {/* LEFT AREA */}
      {/* ==================================================================== */}

      <div className="flex items-center gap-2 sm:gap-3 min-w-0">

        {/* ================================================================ */}
        {/* Logo */}
        {/* ================================================================ */}

        <div className="flex items-center gap-2">

          <div
            className="
              flex
              items-center
              gap-2
              rounded-xl
              border
              border-purple-500/40
              bg-slate-900/40
              px-2
              py-1
              shadow-md
              transition-all
              hover:brightness-110
              dark:bg-slate-800/80
            "
          >
            <img
              src={logoSublimStudioSvg}
              alt="SublimStudio PRO"
              className="h-6 w-6 rounded object-contain"
              onError={(e) => {
                const img = e.currentTarget;
                img.onerror = null;
                if (!img.dataset.triedPng) {
                  img.dataset.triedPng = 'true';
                  img.src = logoSublimStudioPng;
                } else if (!img.dataset.triedFavicon) {
                  img.dataset.triedFavicon = 'true';
                  img.src = faviconPng;
                }
              }}
            />

            <span
              className="
                bg-gradient-to-r
                from-purple-400
                via-pink-400
                to-amber-300
                bg-clip-text
                text-xs
                font-black
                text-transparent
              "
            >
              SublimStudio

              <span
                className="
                  ml-1
                  rounded
                  bg-purple-600
                  px-1
                  py-0.5
                  text-[9px]
                  text-white
                "
              >
                PRO
              </span>
            </span>

          </div>

          {/* ============================================================ */}
          {/* Main Menu */}
          {/* ============================================================ */}

          <AppMenu
            theme={darkMode ? "dark" : "light"}
            onExport={onExportPNG}
            onNewProject={onNewProject}
            onOpenProject={openProject}
            onIncludeStamp={importImage}
            onSaveLayout={saveLayout}
            onOpenSettings={onOpenShortcuts}
            onOpenAndroidModal={onOpenAndroidModal}
            onOpenAISettings={onOpenAISettings}
          />

        </div>

        {/* ================================================================ */}
        {/* IDE MENUS */}
        {/* ================================================================ */}

        <div
          className={`
            hidden
            lg:flex
            items-center
            gap-1
            text-[11px]
            font-medium
            ${
              darkMode
                ? "text-slate-300"
                : "text-slate-700"
            }
          `}
        >

          {/* ============================================================ */}
          {/* VIEW */}
          {/* ============================================================ */}

          <div className="relative">

            <button
              onClick={() => toggleDropdown("view")}
              className="
                rounded
                px-2
                py-1
                transition-colors
                hover:bg-slate-700/20
              "
            >
              Exibir
            </button>

            {dropdown === "view" && (

              <div
                onMouseLeave={closeDropdown}
                className="
                  absolute
                  top-8
                  left-0
                  z-50
                  w-56
                  rounded-xl
                  border
                  bg-[#161B26]
                  shadow-2xl
                "
              >

                <button
                  onClick={() => {
                    setShow3DViewport(!show3DViewport);
                    closeDropdown();
                  }}
                  className="
                    flex
                    w-full
                    items-center
                    justify-between
                    px-3
                    py-2
                    hover:bg-slate-700/30
                  "
                >

                  <span className="flex items-center gap-2">

                    <Box
                      className="
                        h-4
                        w-4
                        text-purple-400
                      "
                    />

                    Simulador 3D

                  </span>

                  <span
                    className="
                      rounded
                      bg-cyan-600
                      px-2
                      py-0.5
                      text-[10px]
                      text-white
                    "
                  >
                    {show3DViewport ? "ON" : "OFF"}
                  </span>

                </button>

              </div>

            )}

          </div>

          {/* ============================================================ */}
          {/* PRE PRESS */}
          {/* ============================================================ */}

          <div className="relative">

            <button
              onClick={() => toggleDropdown("press")}
              className="
                rounded
                px-2
                py-1
                font-bold
                text-amber-400
                hover:bg-slate-700/20
              "
            >
              Pré-Prensa
            </button>

            {dropdown === "press" && (

              <div
                onMouseLeave={closeDropdown}
                className="
                  absolute
                  top-8
                  left-0
                  z-50
                  w-64
                  rounded-xl
                  border
                  bg-[#161B26]
                  shadow-2xl
                "
              >

                <button
                  onClick={() => {
                    onOpenPrintModal();
                    closeDropdown();
                  }}
                  className="
                    flex
                    w-full
                    items-center
                    gap-2
                    px-3
                    py-2
                    hover:bg-slate-700/30
                  "
                >
                  <Printer className="h-4 w-4" />

                  Calculadora de Prensa

                </button>

                <button
                  onClick={() => {
                    onOpenGangModal();
                    closeDropdown();
                  }}
                  className="
                    flex
                    w-full
                    items-center
                    gap-2
                    px-3
                    py-2
                    hover:bg-slate-700/30
                  "
                >
                  <Grid className="h-4 w-4" />

                  Gang Sheet

                </button>

              </div>

            )}

          </div>

          {/* ============================================================ */}
          {/* TOOLS */}
          {/* ============================================================ */}

          <div className="relative">

            <button
              onClick={() => toggleDropdown("tools")}
              className="
                rounded
                px-2
                py-1
                hover:bg-slate-700/20
              "
            >
              Ferramentas
            </button>

            {dropdown === "tools" && (

              <div
                onMouseLeave={closeDropdown}
                className="
                  absolute
                  top-8
                  left-0
                  z-50
                  w-72
                  rounded-xl
                  border
                  bg-[#161B26]
                  shadow-2xl
                "
              >

                {onOpenWordArtModal && (

                  <button
                    onClick={() => {
                      onOpenWordArtModal();
                      closeDropdown();
                    }}
                    className="
                      flex
                      w-full
                      items-center
                      gap-2
                      px-3
                      py-2
                      hover:bg-slate-700/30
                    "
                  >
                    <Sparkles className="h-4 w-4" />

                    WordArt Studio

                  </button>

                )}

                {onOpenPresetGallery && (

                  <button
                    onClick={() => {
                      onOpenPresetGallery();
                      closeDropdown();
                    }}
                    className="
                      flex
                      w-full
                      items-center
                      gap-2
                      px-3
                      py-2
                      hover:bg-slate-700/30
                    "
                  >
                    <Sparkles className="h-4 w-4 text-amber-300" />

                    Galeria de Modelos HD

                  </button>

                )}

                {onOpenTestRunner && (

                  <button
                    onClick={() => {
                      onOpenTestRunner();
                      closeDropdown();
                    }}
                    className="
                      flex
                      w-full
                      items-center
                      gap-2
                      px-3
                      py-2
                      hover:bg-slate-700/30
                    "
                  >
                    <Cpu className="h-4 w-4" />

                    Executar Testes QA

                  </button>

                )}

              </div>

            )}

          </div>

        </div>
                {/* ================================================================ */}
        {/* Undo / Redo */}
        {/* ================================================================ */}

        <div
          className={`
            flex
            items-center
            rounded-lg
            border
            p-0.5
            ${
              darkMode
                ? "border-[#232D3F] bg-[#131822]"
                : "border-slate-200 bg-slate-100"
            }
          `}
        >
          <button
            onClick={onUndo}
            disabled={!canUndo}
            className="
              rounded
              p-1.5
              transition
              hover:bg-slate-700/20
              disabled:cursor-not-allowed
              disabled:opacity-30
            "
            title="Desfazer (Ctrl+Z)"
          >
            <RotateCcw className="h-4 w-4" />
          </button>

          <button
            onClick={onRedo}
            disabled={!canRedo}
            className="
              rounded
              p-1.5
              transition
              hover:bg-slate-700/20
              disabled:cursor-not-allowed
              disabled:opacity-30
            "
            title="Refazer (Ctrl+Y)"
          >
            <RotateCw className="h-4 w-4" />
          </button>
        </div>

        {/* ================================================================ */}
        {/* Nome do Projeto */}
        {/* ================================================================ */}

        <input
          type="text"
          value={projectTitle}
          onChange={(e) => setProjectTitle(e.target.value)}
          placeholder="Projeto sem título"
          className={`
            max-w-[220px]
            rounded
            border
            border-transparent
            bg-transparent
            px-2
            py-1
            text-xs
            font-bold
            outline-none
            transition
            focus:border-cyan-500
            ${
              darkMode
                ? "text-slate-100 hover:bg-[#131822]"
                : "text-slate-700 hover:bg-slate-100"
            }
          `}
        />

      </div>

      {/* ==================================================================== */}
      {/* RIGHT AREA */}
      {/* ==================================================================== */}

      <div className="flex items-center gap-2">

        {/* Canvas Presets */}

        <select
          value={currentPreset}
          onChange={(e) => changePreset(e.target.value)}
          className={`
            hidden
            rounded-lg
            border
            px-2
            py-1
            text-[11px]
            font-semibold
            md:block
            ${
              darkMode
                ? "border-[#232D3F] bg-[#131822]"
                : "border-slate-300 bg-slate-100"
            }
          `}
        >
          {CANVAS_PRESETS.map((preset) => (
            <option
              key={`${preset.width}x${preset.height}`}
              value={`${preset.width}x${preset.height}`}
            >
              {preset.label}
            </option>
          ))}
        </select>

        {/* 3D */}

        <button
          onClick={() =>
            setShow3DViewport(!show3DViewport)
          }
          className={`
            flex
            items-center
            gap-1
            rounded-lg
            border
            px-2.5
            py-1
            text-[11px]
            font-bold
            transition-all
            ${
              show3DViewport
                ? "border-purple-500 bg-purple-600 text-white"
                : darkMode
                ? "border-[#232D3F] bg-[#131822]"
                : "border-slate-300 bg-slate-100"
            }
          `}
        >
          <Box className="h-4 w-4" />

          <span className="hidden md:inline">
            Simulador 3D
          </span>
        </button>

        {/* IA */}

        <button
          onClick={onOpenAIConsole}
          className="
            flex
            items-center
            gap-1
            rounded-lg
            bg-gradient-to-r
            from-cyan-500
            to-blue-600
            px-3
            py-1
            text-[11px]
            font-bold
            text-white
          "
        >
          <Zap className="h-4 w-4 text-amber-300" />

          <span className="hidden sm:inline">
            IA Studio
          </span>
        </button>

        {/* Modelos Preset Gallery */}

        {onOpenPresetGallery && (
          <button
            onClick={onOpenPresetGallery}
            className="
              hidden
              sm:flex
              items-center
              gap-1
              rounded-lg
              bg-gradient-to-r
              from-purple-600
              to-pink-600
              hover:brightness-110
              px-3
              py-1
              text-[11px]
              font-bold
              text-white
              shadow-md
            "
          >
            <Sparkles className="h-4 w-4 text-amber-300" />

            <span>Modelos HD</span>
          </button>
        )}

        {/* QA */}

        {onOpenTestRunner && (
          <button
            onClick={onOpenTestRunner}
            className="
              hidden
              sm:flex
              items-center
              gap-1
              rounded-lg
              border
              border-purple-600
              px-3
              py-1
              text-[11px]
              font-bold
            "
          >
            <Cpu className="h-4 w-4" />

            QA
          </button>
        )}

        {/* Atalhos */}

        <button
          onClick={onOpenShortcuts}
          className="
            hidden
            rounded-lg
            border
            p-1.5
            sm:block
          "
          title="Atalhos"
        >
          <Keyboard className="h-4 w-4" />
        </button>

        {/* Tema */}

        <button
          onClick={() =>
            setDarkMode(!darkMode)
          }
          className="
            hidden
            rounded-lg
            border
            p-1.5
            sm:block
          "
        >
          {darkMode ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          )}
        </button>

        {/* Login */}

        {currentUser ? (
          <button
            onClick={onOpenAuthModal}
            className="
              flex
              items-center
              gap-2
              rounded-lg
              border
              border-purple-500
              px-2
              py-1
            "
          >
            <div
              className="
                flex
                h-5
                w-5
                items-center
                justify-center
                rounded-full
                bg-purple-600
                text-[10px]
                font-black
                text-white
              "
            >
              {currentUser.name.charAt(0)}
            </div>

            <span className="hidden md:block">
              {currentUser.name}
            </span>

            <LogOut className="h-3 w-3" />
          </button>
        ) : (
          <button
            onClick={onOpenAuthModal}
            className="
              flex
              items-center
              gap-1
              rounded-lg
              bg-purple-600
              px-3
              py-1
              text-[11px]
              font-bold
              text-white
            "
          >
            <LogIn className="h-4 w-4" />

            Login
          </button>
        )}

        {/* Exportar */}

        <button
          onClick={onExportPNG}
          className="
            flex
            items-center
            gap-1.5
            rounded-lg
            bg-gradient-to-r
            from-emerald-500
            to-teal-600
            px-3
            py-1
            font-black
            text-slate-900
            shadow-lg
          "
        >
          <Share2 className="h-4 w-4" />

          Exportar
        </button>

      </div>

    </header>

  );
};

export default HeaderBar;
