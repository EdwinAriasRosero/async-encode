namespace Domain.Tests
{
    public class Tests
    {
        ConvertInputStringCommandHandler _handler;


        [SetUp]
        public void Setup()
        {
            _handler = new ConvertInputStringCommandHandler();
        }

        [Test]
        public async Task ConvertToBase64_WhenCorrectData_ThenSuccess()
        {
            //Arrange
            var command = new ConvertInputStringCommand { InputString = "Hello, World!" };
            var cts = new CancellationTokenSource();

            //Act
            var result = await _handler.Handle(command, cts.Token);

            //Assert
            Assert.AreEqual(result, "SGVsbG8sIFdvcmxkIQ==");
        }
    }
}