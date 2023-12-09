add_executable(game_runtime)

if(EMSCRIPTEN)
    target_link_options(game_runtime PRIVATE
        --pre-js ${CMAKE_CURRENT_SOURCE_DIR}/web_conf/pre.js
        "SHELL:-s USE_GLFW=3"
        "SHELL:-s ASSERTIONS=1"
        "SHELL:-s WASM=1"
        "SHELL:-s ASYNCIFY"
    )
    set(CMAKE_EXECUTABLE_SUFFIX ".html") # This line is used to set your executable to build with the emscripten html template so taht you can directly open it.
    add_custom_command(TARGET game_runtime
        POST_BUILD COMMAND ${CMAKE_COMMAND} -E copy_if_different ${CMAKE_CURRENT_SOURCE_DIR}/web_conf/resourceList.json $<TARGET_FILE_DIR:game_runtime>
    )
else()
    target_include_directories(game_runtime PRIVATE
        ${raylib_INCLUDE_DIR}
    )
endif()

target_sources(game_runtime PRIVATE
    main.cpp
)

set_target_properties(game_runtime
    PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY "${CMAKE_BINARY_DIR}/dest"
    OUTPUT_NAME main
)

target_link_libraries(game_runtime
    ${raylib_LIBRARIES}
)

add_custom_command(TARGET game_runtime
    POST_BUILD COMMAND ${CMAKE_COMMAND} -E copy_directory_if_different ${CMAKE_SOURCE_DIR}/res $<TARGET_FILE_DIR:game_runtime>/res
)