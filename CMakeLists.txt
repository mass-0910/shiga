cmake_minimum_required(VERSION 3.26)

if(${CMAKE_SOURCE_DIR} STREQUAL ${CMAKE_BINARY_DIR})
    message(FATAL_ERROR "In-source builds not allowed. Please make a new directory (called a build directory) and run CMake from there. You may need to remove CMakeCache.txt. ")
endif()

include(FetchContent)

project(shiga
    VERSION 0.1
)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_C_STANDARD 11)
set(CMAKE_C_STANDARD_REQUIRED ON)

if(EMSCRIPTEN)
    FetchContent_Declare(raylib_webasm_dl
        URL https://github.com/raysan5/raylib/releases/download/5.0/raylib-5.0_webassembly.zip
        URL_HASH SHA256=659EFF4BE1C733D5CF7D1B96E9DB19FF792A36BE56DEB68725BD8331BCC9AA2E
    )
    FetchContent_MakeAvailable(raylib_webasm_dl)
    add_library(raylib_webasm INTERFACE)
    target_link_libraries(raylib_webasm INTERFACE ${raylib_webasm_dl_SOURCE_DIR}/lib/libraylib.a)
    target_include_directories(raylib_webasm INTERFACE ${raylib_webasm_dl_SOURCE_DIR}/include)
    set(raylib_LIBRARIES raylib_webasm)
else()
    find_package(raylib REQUIRED)
endif()

add_subdirectory(src)